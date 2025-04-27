
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
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, firstName, verificationCode }: VerificationEmailRequest = await req.json();

    // Log the request details for debugging
    console.log(`Sending verification email to ${email} with code: ${verificationCode}`);

    // For Resend in test mode, use shaidakawa15@gmail.com as the 'to' email
    // This is a temporary solution until domain verification is complete
    // In production, you would use the actual user email
    const recipientEmail = "shaidakawa15@gmail.com"; // The verified email in test mode
    
    const emailResponse = await resend.emails.send({
      from: "Oldie Verification <onboarding@resend.dev>",
      to: [recipientEmail], // Use the verified email in test mode
      subject: `Your Oldie Verification Code: ${verificationCode}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; margin-bottom: 24px;">Welcome to Oldie!</h1>
          <p>Hello ${firstName || 'there'},</p>
          <p>Thank you for creating an account with Oldie. Your verification code is:</p>
          
          <div style="margin: 32px 0; text-align: center;">
            <h2 style="background-color: #000; color: white; padding: 12px 24px; display: inline-block; letter-spacing: 5px;">${verificationCode}</h2>
          </div>
          
          <p>This code will expire in 10 minutes.</p>
          
          <p><strong>Important:</strong> In development mode, this email is being sent to the verified test email (${recipientEmail}), but in the database, the code is associated with ${email}.</p>
          
          <p>If you did not create an account, please ignore this email.</p>
          
          <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Oldie. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ 
      message: "Verification email processing completed",
      note: "In development mode, emails are sent to the verified email address only",
      emailDetails: {
        to: recipientEmail,
        code: verificationCode,
        actualUserEmail: email
      }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        hint: "If using Resend in test mode, make sure to verify your domain at resend.com/domains"
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
