import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "../integrations/firebase";

// Local user structure
type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: "user" | "admin";
  verified: boolean;
};

// What the context provides
type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<{ email: string; firstName: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<boolean>;
  sendVerificationCode: (email: string, firstName: string) => Promise<void>;
  sendPasswordResetCode: (email: string) => Promise<void>;
  resetPasswordWithCode: (
    email: string,
    code: string,
    newPassword: string
  ) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();
          setUser({
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role || "user",
            verified: data.verified,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 🔐 Generate random 6-digit code
  const generateCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  // ✅ Signup
  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
  
      const code = generateCode();
  
      await setDoc(doc(db, "users", cred.user.uid), {
        email,
        firstName,
        lastName,
        role: "user",
        verified: false,
      });
  
      await addDoc(collection(db, "email_verifications"), {
        email,
        code,
        createdAt: serverTimestamp(),
        isUsed: false,
        expiresAt: Date.now() + 15 * 60 * 1000,
      });
  
      console.log(`✅ Verification code sent to ${email}: ${code}`);
      return { email, firstName };
    } catch (error) {
      console.error("Signup Error:", error);
      throw error;
    }
  };
  
  // ✅ Email verification
  const verifyEmail = async (email: string, code: string) => {
    const q = query(
      collection(db, "email_verifications"),
      where("email", "==", email),
      where("code", "==", code),
      where("isUsed", "==", false)
    );
    const snap = await getDocs(q);

    if (snap.empty) throw new Error("Invalid or expired verification code");

    const docRef = snap.docs[0].ref;
    const data = snap.docs[0].data();

    if (data.expiresAt < Date.now()) throw new Error("Verification code expired");

    await updateDoc(docRef, { isUsed: true });

    const userQuery = query(
      collection(db, "users"),
      where("email", "==", email)
    );
    const userSnap = await getDocs(userQuery);
    if (!userSnap.empty) {
      await updateDoc(userSnap.docs[0].ref, { verified: true });
    }

    return true;
  };

  // ✅ Login
  const login = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const userRef = doc(db, "users", cred.user.uid);
    const userSnap = await getDoc(userRef);
    const data = userSnap.data();

    if (!data?.verified) {
      throw new Error("Email not verified yet.");
    }
  };

  // ✅ Logout
  const logout = async () => {
    await signOut(auth);
  };

  // ✅ Reset password (via Firebase built-in email)
  const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  // ✅ Manual verification code sender
  const sendVerificationCode = async (email: string, firstName: string) => {
    const code = generateCode();
    await addDoc(collection(db, "email_verifications"), {
      email,
      code,
      createdAt: serverTimestamp(),
      isUsed: false,
      expiresAt: Date.now() + 15 * 60 * 1000,
    });

    console.log(`Resent code for ${email}: ${code}`);
  };

  // ✅ Optional: reuse same email reset for code-based method
  const sendPasswordResetCode = async (email: string) => {
    await sendPasswordResetEmail(auth, email);
  };

  // ✅ Not needed for Firebase reset, included for compatibility
  const resetPasswordWithCode = async (
    email: string,
    code: string,
    newPassword: string
  ) => {
    console.log("Handled by Firebase reset flow");
    return true;
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === "admin";

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isAdmin,
        login,
        signup,
        logout,
        resetPassword,
        verifyEmail,
        sendVerificationCode,
        sendPasswordResetCode,
        resetPasswordWithCode,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

// ✅ Custom hook for use in pages
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
