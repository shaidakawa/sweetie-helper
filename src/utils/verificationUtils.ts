import { supabase } from '@/integrations/supabase/client';

export const sendVerificationCode = async (email: string, firstName: string) => {
  try {
    // Check if there's an existing verification code for this email that's still valid
    const now = new Date().toISOString();
    const { data: existingVerifications } = await supabase
      .from('email_verifications')
      .select('*')
      .eq('email', email)
      .gt('expires_at', now)
      .eq('is_used', false)
      .order('created_at', { ascending: false })
      .limit(1);
    
    // If there's a recent valid verification code, reuse it
    if (existingVerifications && existingVerifications.length > 0) {
      const verificationCode = existingVerifications[0].code;
      
      const response = await supabase.functions.invoke('send-verification', {
        body: { email, firstName, verificationCode }
      });
      
      if (response.error) {
        console.error('Error invoking send-verification function:', response.error);
        throw new Error(response.error.message || 'Failed to send verification email');
      }
      
      console.log("Reused existing verification code and sent email:", response);
      return;
    }
    
    // Otherwise create a new verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const { error: verificationError } = await supabase
      .from('email_verifications')
      .insert({
        email,
        code: verificationCode,
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
      });

    if (verificationError) {
      console.error('Error inserting verification code:', verificationError);
      throw new Error(`Failed to create verification code: ${verificationError.message}`);
    }

    const response = await supabase.functions.invoke('send-verification', {
      body: { email, firstName, verificationCode }
    });

    if (response.error) {
      console.error('Error invoking send-verification function:', response.error);
      throw new Error(response.error.message || 'Failed to send verification email');
    }

    console.log("Verification email sent:", response);
  } catch (error) {
    console.error('Send verification code error:', error);
    throw error;
  }
};

export const sendPasswordResetCode = async (email: string) => {
  try {
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    const { error: resetError } = await supabase
      .from('password_resets')
      .insert({
        email,
        code: resetCode,
        expires_at: new Date(Date.now() + 10 * 60 * 1000).toISOString()
      });

    if (resetError) {
      console.error('Error inserting password reset code:', resetError);
      throw new Error(`Failed to create password reset code: ${resetError.message}`);
    }

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
      console.error('Error invoking send-verification function for password reset:', response.error);
      throw new Error(response.error.message || 'Failed to send password reset email');
    }

    console.log("Password reset email sent:", response);
  } catch (error) {
    console.error('Send password reset code error:', error);
    throw error;
  }
};
