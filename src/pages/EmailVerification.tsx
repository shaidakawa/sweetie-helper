import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "@/components/ui/use-toast";

const EmailVerification = () => {
  const { state } = useLocation();
  const { verifyEmail, sendVerificationCode } = useAuth();
  const navigate = useNavigate();

  const email = state?.email;
  const firstName = state?.firstName;

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!code) {
      toast({ title: "Please enter the code.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    try {
      await verifyEmail(email, code);
      toast({
        title: "Email verified",
        description: "Your account is now active.",
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Invalid or expired code",
        description: error instanceof Error ? error.message : "",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      await sendVerificationCode(email, firstName);
      toast({ title: "Code resent", description: "Check your email again." });
    } catch (error) {
      toast({
        title: "Failed to resend code",
        description: error instanceof Error ? error.message : "",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="animate-slide-in">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-10rem)]">
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
            <h1 className="text-5xl font-playfair font-bold mb-6">
              Verify Email
            </h1>
            <p className="mb-4 text-lg">
              We've sent a 6-digit verification code to{" "}
              <strong>{email}</strong>. Please check your email and enter the
              code below.
            </p>

            <div className="space-y-4 max-w-md">
              <div>
                <label className="block mb-1 text-base font-semibold">
                  Verification Code
                </label>
                <input
                  type="text"
                  maxLength={6}
                  className="glass-input shadow-md w-full"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                />
              </div>

              <button
                onClick={handleVerify}
                className="btn-black w-full py-3 shadow-md hover:shadow-lg transition-shadow"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </button>

              <p className="text-sm text-gray-500 mt-4">
                Didn’t receive the code?{" "}
                <button
                  onClick={handleResend}
                  className="underline text-oldie-black"
                >
                  Resend
                </button>
              </p>
            </div>
          </div>

          <div className="hidden md:flex md:w-1/2 items-center justify-center">
            <div className="w-3/5 h-3/5">
              <img
                src="/lovable-uploads/login.jpg"
                alt="Clothes rack"
                className="w-full h-full object-cover rounded-md shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
