
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

    console.log(`Sending verification email to ${email} with code: ${verificationCode}`);

    const emailResponse = await resend.emails.send({
      from: "Oldie Verification <onboarding@resend.dev>",
      to: [email],
      subject: "Verify your Oldie account",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333; margin-bottom: 24px;">Welcome to Oldie!</h1>
          <p>Hello ${firstName || 'there'},</p>
          <p>Thank you for creating an account with Oldie. Please verify your email address using the code below:</p>
          
          <div style="margin: 32px 0; text-align: center;">
            <h2 style="background-color: #000; color: white; padding: 12px 24px; display: inline-block; letter-spacing: 5px;">${verificationCode}</h2>
          </div>
          
          <p>This code will expire in 10 minutes.</p>
          
          <p>If you did not create an account, please ignore this email.</p>
          
          <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #eee; color: #666; font-size: 12px;">
            <p>© ${new Date().getFullYear()} Oldie. All rights reserved.</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending verification email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
