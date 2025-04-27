
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User as SupabaseUser, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { User, UserProfile } from '@/types';
import { toast } from '@/components/ui/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  sendVerificationEmail: (email: string, firstName: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  const transformUser = async (supabaseUser: SupabaseUser | null): Promise<User | null> => {
    if (!supabaseUser) return null;
    
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', supabaseUser.id)
      .single();

    return {
      id: supabaseUser.id,
      email: supabaseUser.email || '',
      firstName: profile?.first_name || '',
      lastName: profile?.last_name || '',
      role: supabaseUser.email === 'admin@oldie.com' ? 'admin' : 'user',
    };
  };

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

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    // First, sign up the user
    const { error, data: signUpData } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        }
      }
    });
    
    if (error) throw error;
    
    // If sign up was successful, update the profile
    if (signUpData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName
        })
        .eq('id', signUpData.user.id);
        
      if (profileError) throw profileError;

      // Set up OTP and verification link
      const siteUrl = window.location.origin;
      const { data: otpData, error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${siteUrl}/login`,
        },
      });

      if (otpError) throw otpError;

      // Send verification email via our edge function
      const verificationLink = `${siteUrl}/login?email=${encodeURIComponent(email)}`;
      
      const response = await supabase.functions.invoke('send-verification', {
        body: { email, firstName, verificationLink },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to send verification email');
      }
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
  };

  const sendVerificationEmail = async (email: string, firstName: string) => {
    const siteUrl = window.location.origin;
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${siteUrl}/login`,
      },
    });

    if (error) throw error;

    const verificationLink = `${siteUrl}/login?email=${encodeURIComponent(email)}`;
    
    const response = await supabase.functions.invoke('send-verification', {
      body: { email, firstName, verificationLink },
    });

    if (response.error) {
      throw new Error(response.error.message || 'Failed to send verification email');
    }

    return response.data;
  };

  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ 
      user, 
      session,
      isAuthenticated, 
      isAdmin, 
      login, 
      signup,
      logout,
      resetPassword,
      sendVerificationEmail
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
