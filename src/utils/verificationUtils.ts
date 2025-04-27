
import { supabase } from '@/integrations/supabase/client';

export const sendVerificationCode = async (email: string, firstName: string) => {
  const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  const { error: verificationError } = await supabase
    .from('email_verifications')
    .insert({
      email,
      code: verificationCode,
      expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
    });

  if (verificationError) throw verificationError;

  const response = await supabase.functions.invoke('send-verification', {
    body: { email, firstName, verificationCode }
  });

  if (response.error) {
    throw new Error(response.error.message || 'Failed to send verification email');
  }

  console.log("Verification email sent:", response);
};

export const sendPasswordResetCode = async (email: string) => {
  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  
  const { error: resetError } = await supabase
    .from('password_resets')
    .insert({
      email,
      code: resetCode,
      expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
    });

  if (resetError) throw resetError;

  const { data: userData } = await supabase
    .from('profiles')
    .select('first_name')
    .eq('id', email)
    .maybeSingle();

  const firstName = userData?.first_name || 'there';

  const response = await supabase.functions.invoke('send-verification', {
    body: { email, firstName, verificationCode: resetCode, isPasswordReset: true }
  });

  if (response.error) {
    throw new Error(response.error.message || 'Failed to send password reset email');
  }

  console.log("Password reset email sent:", response);
};
