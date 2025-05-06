
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

// Create a mock context with placeholder functionality
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  
  // Mock functions that would normally interact with a backend
  const login = async (email: string, password: string) => {
    console.log('Mock login with:', email, password);
    // In a real app, this would validate credentials with a backend
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
    // In a real app, this would create a user in the backend
    // For now, we'll just log the signup attempt and return the email
    return { email, firstName };
  };

  const logout = async () => {
    console.log('Mock logout');
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    console.log('Mock reset password for:', email);
    // This would send a password reset email in a real app
  };

  const verifyEmail = async (email: string, code: string) => {
    console.log('Mock verify email:', email, code);
    // In a real app, this would verify the email with the backend
    // For mock purposes, we'll just return true
    return true;
  };

  const sendVerificationCode = async (email: string, firstName: string) => {
    console.log('Mock send verification code to:', email, firstName);
    // This would send a verification code email in a real app
  };

  const sendPasswordResetCode = async (email: string) => {
    console.log('Mock send password reset code to:', email);
    // This would send a password reset code email in a real app
  };

  const resetPasswordWithCode = async (email: string, code: string, newPassword: string) => {
    console.log('Mock reset password with code:', email, code, newPassword);
    // In a real app, this would verify the code and reset the password
    // For mock purposes, we'll just return true
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
