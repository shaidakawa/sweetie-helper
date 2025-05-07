
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { User } from '@/types';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  loading: boolean;
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        if (newSession?.user) {
          const userData: User = {
            id: newSession.user.id,
            email: newSession.user.email || '',
            firstName: newSession.user.user_metadata?.first_name,
            lastName: newSession.user.user_metadata?.last_name,
            role: newSession.user.user_metadata?.role || 'user'
          };
          setUser(userData);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      if (currentSession?.user) {
        const userData: User = {
          id: currentSession.user.id,
          email: currentSession.user.email || '',
          firstName: currentSession.user.user_metadata?.first_name,
          lastName: currentSession.user.user_metadata?.last_name,
          role: currentSession.user.user_metadata?.role || 'user'
        };
        setUser(userData);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const sendEmail = async (to: string, subject: string, html: string) => {
    try {
      const response = await supabase.functions.invoke('send-email', {
        body: { to, subject, html }
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to send email');
      }

      return response.data;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.message || 'Failed to login');
    }
  };

  const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      // First generate a verification code
      const { data, error: functionError } = await supabase.rpc('send_verification_email', { 
        email 
      });

      if (functionError) {
        throw functionError;
      }

      const verificationCode = data;

      // Create the user with email and password but don't sign them in
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
          // Important: Don't auto-confirm the email
          emailRedirectTo: window.location.origin + '/login'
        }
      });

      if (signUpError) {
        throw signUpError;
      }

      // Send the verification code email using our custom function
      await sendEmail(
        email,
        "Verify your email address",
        `
          <h1>Welcome to Oldie!</h1>
          <p>Hello ${firstName},</p>
          <p>Thank you for signing up. Please use the following code to verify your email address:</p>
          <h2 style="letter-spacing: 2px; font-size: 28px; background: #f4f4f4; padding: 10px; display: inline-block;">${verificationCode}</h2>
          <p>This code will expire in 10 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
        `
      );

      return { email, firstName };
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Failed to sign up');
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error: any) {
      console.error('Logout error:', error);
      throw new Error(error.message || 'Failed to log out');
    }
  };

  const verifyEmail = async (email: string, code: string) => {
    try {
      const { data, error } = await supabase.rpc('verify_code', {
        email_addr: email,
        verification_code: code
      });

      if (error) {
        throw error;
      }

      if (data) {
        // If successful, mark user as verified
        const { data: userData, error: userError } = await supabase.auth.getUser();
        
        if (userError) {
          throw userError;
        }
        
        // Update the user metadata if we have a session
        if (userData) {
          await supabase.auth.updateUser({
            data: { email_verified: true }
          });
        }
      }

      return data;
    } catch (error: any) {
      console.error('Verify email error:', error);
      throw new Error(error.message || 'Failed to verify email');
    }
  };

  const sendVerificationCode = async (email: string, firstName: string) => {
    try {
      // Generate a new verification code
      const { data, error: functionError } = await supabase.rpc('send_verification_email', { 
        email 
      });

      if (functionError) {
        throw functionError;
      }

      const verificationCode = data;

      // Send the verification code email using our custom function
      await sendEmail(
        email,
        "Your email verification code",
        `
          <h1>Verification Code</h1>
          <p>Hello ${firstName},</p>
          <p>Here is your verification code:</p>
          <h2 style="letter-spacing: 2px; font-size: 28px; background: #f4f4f4; padding: 10px; display: inline-block;">${verificationCode}</h2>
          <p>This code will expire in 10 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
        `
      );
    } catch (error: any) {
      console.error('Send verification code error:', error);
      throw new Error(error.message || 'Failed to send verification code');
    }
  };

  const sendPasswordResetCode = async (email: string) => {
    try {
      // Generate a password reset code
      const { data, error: functionError } = await supabase.rpc('generate_password_reset_code', { 
        email_addr: email 
      });

      if (functionError) {
        throw functionError;
      }

      const resetCode = data;

      // Send the password reset email using our custom function
      await sendEmail(
        email,
        "Your password reset code",
        `
          <h1>Password Reset</h1>
          <p>You requested to reset your password. Use the following code:</p>
          <h2 style="letter-spacing: 2px; font-size: 28px; background: #f4f4f4; padding: 10px; display: inline-block;">${resetCode}</h2>
          <p>This code will expire in 10 minutes.</p>
          <p>If you did not request this, please ignore this email.</p>
        `
      );
    } catch (error: any) {
      console.error('Send password reset code error:', error);
      throw new Error(error.message || 'Failed to send password reset code');
    }
  };

  const resetPasswordWithCode = async (email: string, code: string, newPassword: string) => {
    try {
      // Verify the reset code
      const { data: isValid, error: verifyError } = await supabase.rpc('verify_password_reset', {
        email_addr: email,
        reset_code: code
      });

      if (verifyError) {
        throw verifyError;
      }

      if (!isValid) {
        throw new Error('Invalid or expired reset code');
      }

      // Reset the password
      const { error: resetError } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (resetError) {
        throw resetError;
      }

      return true;
    } catch (error: any) {
      console.error('Reset password error:', error);
      throw new Error(error.message || 'Failed to reset password');
    }
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetCode(email);
  };

  // Check if user is admin
  const isAdmin = user ? user.role === 'admin' : false;

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isAuthenticated: !!user,
      isAdmin,
      loading,
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
