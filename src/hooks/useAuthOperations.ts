
import { supabase } from '@/integrations/supabase/client';
import { sendVerificationCode, sendPasswordResetCode } from '@/utils/verificationUtils';

export const useAuthOperations = () => {
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

  const resetPasswordWithCode = async (email: string, code: string, newPassword: string) => {
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

    const { error: updateError } = await supabase
      .from('password_resets')
      .update({ is_used: true })
      .eq('id', resetData.id);

    if (updateError) throw updateError;

    const { error: passwordError } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (passwordError) throw passwordError;

    return true;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const resetPassword = async (email: string) => {
    await sendPasswordResetCode(email);
  };

  return {
    login,
    signup,
    logout,
    resetPassword,
    verifyEmail,
    resetPasswordWithCode,
  };
};
