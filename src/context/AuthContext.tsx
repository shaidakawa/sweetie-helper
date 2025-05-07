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
import emailjs from "@emailjs/browser";
import { auth, db } from "../integrations/firebase";

// Replace these with your actual EmailJS credentials
const EMAILJS_SERVICE_ID = "service_jr87w77";
const EMAILJS_TEMPLATE_ID = "template_qadu37n";
const EMAILJS_PUBLIC_KEY = "NRQYykpDmzLwIT3tJ";

type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: "user" | "admin";
  verified: boolean;
};

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

  const generateCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const signup = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
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

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_name: firstName,
        email,
        code,
      },
      EMAILJS_PUBLIC_KEY
    );

    return { email, firstName };
  };

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
    if (data.expiresAt < Date.now())
      throw new Error("Verification code expired");

    await updateDoc(docRef, { isUsed: true });

    const userQuery = query(collection(db, "users"), where("email", "==", email));
    const userSnap = await getDocs(userQuery);
    if (!userSnap.empty) {
      await updateDoc(userSnap.docs[0].ref, { verified: true });
    }

    return true;
  };

  const login = async (email: string, password: string) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const userRef = doc(db, "users", cred.user.uid);
    const userSnap = await getDoc(userRef);
    const data = userSnap.data();
    if (!data?.verified) throw new Error("Email not verified yet.");
  };

  const logout = async () => await signOut(auth);
  const resetPassword = async (email: string) => await sendPasswordResetEmail(auth, email);

  const sendVerificationCode = async (email: string, firstName: string) => {
    const code = generateCode();
    await addDoc(collection(db, "email_verifications"), {
      email,
      code,
      createdAt: serverTimestamp(),
      isUsed: false,
      expiresAt: Date.now() + 15 * 60 * 1000,
    });

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        to_name: firstName,
        email,
        code,
      },
      EMAILJS_PUBLIC_KEY
    );
  };

  const sendPasswordResetCode = async (email: string) =>
    await sendPasswordResetEmail(auth, email);

  const resetPasswordWithCode = async () => {
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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
