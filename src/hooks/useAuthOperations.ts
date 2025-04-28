
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
    try {
      // Skip the check for existing users - allowing multiple accounts per email
      
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
      
      if (error) {
        // Handle other signup errors, but not "User already registered"
        if (error.message.includes('User already registered')) {
          // Generate a unique email by appending a timestamp
          const timestamp = new Date().getTime();
          const uniqueEmail = `${email.split('@')[0]}+${timestamp}@${email.split('@')[1]}`;
          
          console.log(`Email already registered, trying with unique email: ${uniqueEmail}`);
          
          // Try again with the unique email
          const { error: retryError, data: retryData } = await supabase.auth.signUp({
            email: uniqueEmail,
            password,
            options: {
              data: {
                first_name: firstName,
                last_name: lastName
              },
            }
          });
          
          if (retryError) throw retryError;
          
          if (retryData.user) {
            const { error: profileError } = await supabase
              .from('profiles')
              .update({
                first_name: firstName,
                last_name: lastName
              })
              .eq('id', retryData.user.id);
              
            if (profileError) {
              console.error('Profile update error:', profileError);
            }

            try {
              // Send verification code to the original email
              await sendVerificationCode(email, firstName);
            } catch (verificationError) {
              console.error('Verification code error:', verificationError);
              throw new Error('Account created but failed to send verification email. Please contact support.');
            }
            
            return { email, firstName };
          }
        } else {
          throw error;
        }
      }
      
      if (signUpData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            first_name: firstName,
            last_name: lastName
          })
          .eq('id', signUpData.user.id);
          
        if (profileError) {
          console.error('Profile update error:', profileError);
          // Continue even if profile update fails - don't block the signup process
        }

        try {
          await sendVerificationCode(email, firstName);
        } catch (verificationError) {
          console.error('Verification code error:', verificationError);
          throw new Error('Account created but failed to send verification email. Please contact support.');
        }
        
        return { email, firstName };
      }

      throw new Error('Signup failed: Unable to create user account');
    } catch (error) {
      console.error('Signup process error:', error);
      
      // Check for specific error types and provide clearer messages
      if (error instanceof Error) {
        // Don't block "User already registered" errors anymore
        // but handle other specific errors
        throw error;
      }
      
      throw new Error('An unexpected error occurred during signup');
    }
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
