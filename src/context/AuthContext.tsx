
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
  signup: (email: string, password: string, firstName: string, lastName: string) => Promise<{ email: string, firstName: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  verifyEmail: (email: string, code: string) => Promise<boolean>;
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
    // Check if email is verified before login
    const { data: verifications } = await supabase
      .from('email_verifications')
      .select('*')
      .eq('email', email)
      .eq('is_used', true)
      .single();

    if (!verifications) {
      throw new Error('Please verify your email before logging in');
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    // First sign up the user with email confirmation disabled
    const { error, data: signUpData } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        },
        emailRedirectTo: `${window.location.origin}/verify-email`,
        // We don't use the built-in email confirmation
        // since we're implementing our own verification system
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

      // Generate a 6-digit verification code
      const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store the verification code in the database
      // Fix: Convert Date object to ISO string for the expires_at field
      const { error: verificationError } = await supabase
        .from('email_verifications')
        .insert({
          email,
          code: verificationCode,
          expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes from now, as ISO string
        });

      if (verificationError) throw verificationError;

      // Send verification email via our edge function
      const response = await supabase.functions.invoke('send-verification', {
        body: { email, firstName, verificationCode },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to send verification email');
      }

      console.log("Verification email response:", response);

      return { email, firstName };
    }

    throw new Error('Signup failed');
  };

  const verifyEmail = async (email: string, code: string) => {
    // Check if the verification code is valid and not expired
    const { data: verification, error } = await supabase
      .from('email_verifications')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !verification) {
      throw new Error('Invalid or expired verification code');
    }

    // Mark the verification as used
    const { error: updateError } = await supabase
      .from('email_verifications')
      .update({ is_used: true })
      .eq('id', verification.id);

    if (updateError) throw updateError;

    return true;
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
      verifyEmail
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
