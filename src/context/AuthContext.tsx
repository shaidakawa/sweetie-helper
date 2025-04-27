
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@/types';
import { transformUser } from '@/utils/authTransform';
import { useAuthOperations } from '@/hooks/useAuthOperations';

type AuthContextType = {
  user: User | null;
  session: Session | null;
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
  const [session, setSession] = useState<Session | null>(null);
  const authOperations = useAuthOperations();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        const transformedUser = await transformUser(currentSession?.user ?? null);
        setUser(transformedUser);
      }
    );

    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      const transformedUser = await transformUser(currentSession?.user ?? null);
      setUser(transformedUser);
    });

    return () => subscription.unsubscribe();
  }, []);

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      session,
      isAuthenticated, 
      isAdmin,
      ...authOperations,
      sendVerificationCode: async (email: string, firstName: string) => {
        // Re-export the function from verificationUtils
        const { sendVerificationCode } = await import('@/utils/verificationUtils');
        return sendVerificationCode(email, firstName);
      },
      sendPasswordResetCode: async (email: string) => {
        // Re-export the function from verificationUtils
        const { sendPasswordResetCode } = await import('@/utils/verificationUtils');
        return sendPasswordResetCode(email);
      }
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
