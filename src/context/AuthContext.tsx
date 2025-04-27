
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
  sendVerificationCode: (email: string, firstName: string) => Promise<void>;
  sendPasswordResetCode: (email: string) => Promise<void>;
  resetPasswordWithCode: (email: string, code: string, newPassword: string) => Promise<boolean>;
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

  const sendVerificationCode = async (email: string, firstName: string) => {
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store the verification code in the database
    const { error: verificationError } = await supabase
      .from('email_verifications')
      .insert({
        email,
        code: verificationCode,
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes from now
      });

    if (verificationError) throw verificationError;

    // Send verification email via edge function
    const response = await supabase.functions.invoke('send-verification', {
      body: { email, firstName, verificationCode },
    });

    if (response.error) {
      throw new Error(response.error.message || 'Failed to send verification email');
    }

    console.log("Verification email sent:", response);
  };

  const sendPasswordResetCode = async (email: string) => {
    // Generate a 6-digit reset code
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store the reset code in the database
    const { error: resetError } = await supabase
      .from('password_resets')
      .insert({
        email,
        code: resetCode,
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes from now
      });

    if (resetError) throw resetError;

    // Get user's first name if possible
    const { data: userData } = await supabase
      .from('profiles')
      .select('first_name')
      .eq('email', email)
      .maybeSingle();

    const firstName = userData?.first_name || 'User';

    // Send password reset email via our edge function
    const response = await supabase.functions.invoke('send-verification', {
      body: { email, firstName, verificationCode: resetCode, isPasswordReset: true },
    });

    if (response.error) {
      throw new Error(response.error.message || 'Failed to send password reset email');
    }

    console.log("Password reset email sent:", response);
  };
  
  const resetPasswordWithCode = async (email: string, code: string, newPassword: string) => {
    // Verify the code is valid
    const { data: resetData, error: resetError } = await supabase
      .from('password_resets')
      .select('*')
      .eq('email', email)
      .eq('code', code)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (resetError || !resetData) {
      throw new Error('Invalid or expired reset code');
    }

    // Mark the reset code as used
    const { error: updateError } = await supabase
      .from('password_resets')
      .update({ is_used: true })
      .eq('id', resetData.id);

    if (updateError) throw updateError;

    // Use Supabase's built-in password update
    const { error: passwordError } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (passwordError) throw passwordError;

    return true;
  };
  
  const login = async (email: string, password: string) => {
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
    const { error, data: signUpData } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName
        },
      }
    });
    
    if (error) throw error;
    
    if (signUpData.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          first_name: firstName,
          last_name: lastName
        })
        .eq('id', signUpData.user.id);
        
      if (profileError) throw profileError;

      // Send the verification code immediately after successful signup
      await sendVerificationCode(email, firstName);

      return { email, firstName };
    }

    throw new Error('Signup failed');
  };

  const verifyEmail = async (email: string, code: string) => {
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
    // Use our custom password reset flow
    await sendPasswordResetCode(email);
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
