
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface VerificationEmailRequest {
  email: string;
  firstName: string;
  verificationCode: string;
  isPasswordReset?: boolean;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, verificationCode, isPasswordReset = false }: VerificationEmailRequest = await req.json();

    console.log(`Sending ${isPasswordReset ? 'password reset' : 'verification'} email to ${email} with code: ${verificationCode}`);
    
    const subject = isPasswordReset 
      ? `Your Oldie Password Reset Code: ${verificationCode}`
      : `Your Oldie Verification Code: ${verificationCode}`;
    
    const title = isPasswordReset ? 'Reset Your Password' : 'Welcome to Oldie!';
    
    const message = isPasswordReset
      ? 'You requested to reset your password. Your password reset code is:'
      : 'Thank you for creating an account with Oldie. Your verification code is:';
    
    // Use the verified email domain (assuming shaidakawa15@gmail.com is verified)
    const emailResponse = await resend.emails.send({
      from: "Oldie <shaidakawa15@gmail.com>",
      to: [email],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; margin-bottom: 24px;">${title}</h1>
          <p>Hello ${firstName || 'there'},</p>
          <p>${message}</p>
          
          <div style="margin: 32px 0; text-align: center;">
            <h2 style="background-color: #000; color: white; padding: 12px 24px; display: inline-block; letter-spacing: 5px;">${verificationCode}</h2>
          </div>
          
          <p>This code will expire in 10 minutes.</p>
          
          <p>${isPasswordReset 
              ? 'If you did not request a password reset, please ignore this email.'
              : 'If you did not create an account, please ignore this email.'}</p>
          
          <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Oldie. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      message: `${isPasswordReset ? 'Password reset' : 'Verification'} email sent successfully`,
      email: email
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        hint: "Make sure the Resend API key is configured correctly"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
