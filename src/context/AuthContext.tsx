import { createContext, useContext, useState, ReactNode } from 'react';

type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<{ email: string, firstName: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<boolean>;
  sendVerificationCode: (email: string, firstName: string) => Promise<void>;
  sendPasswordResetCode: (email: string) => Promise<void>;
  resetPasswordWithCode: (email: string, code: string, newPassword: string) => Promise<boolean>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    console.log('Mock login with:', email, password);
    setUser({
      id: '123',
      email: email,
      firstName: 'Demo',
      lastName: 'User',
      role: email.includes('admin') ? 'admin' : 'user'
    });
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    console.log('Mock signup with:', email, password, firstName, lastName);
    return { email, firstName };
  };

  const logout = async () => {
    console.log('Mock logout');
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    console.log('Mock reset password for:', email);
  };

  const verifyEmail = async (email: string, code: string) => {
    console.log('Mock verify email:', email, code);
    return true;
  };

  const sendVerificationCode = async (email: string, firstName: string) => {
    console.log('Mock send verification code to:', email, firstName);
  };

  const sendPasswordResetCode = async (email: string) => {
    console.log('Mock send password reset code to:', email);
  };

  const resetPasswordWithCode = async (email: string, code: string, newPassword: string) => {
    console.log('Mock reset password with code:', email, code, newPassword);
    return true;
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
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
      resetPasswordWithCode
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
