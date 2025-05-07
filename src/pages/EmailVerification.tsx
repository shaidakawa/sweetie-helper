
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail, sendVerificationCode } = useAuth();

  // Extract email and firstName from location state
  const email = location.state?.email;
  const firstName = location.state?.firstName;

  if (!email) {
    toast({
      title: "Error",
      description: "No email provided for verification",
      variant: "destructive"
    });
    navigate('/signup');
    return null;
  }

  const handleVerification = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const success = await verifyEmail(email, verificationCode);
      
      if (success) {
        toast({
          title: "Email Verified",
          description: "Your email has been successfully verified. You can now log in.",
        });
        
        navigate('/login', { state: { email } });
      } else {
        toast({
          title: "Verification Failed",
          description: "The verification code is invalid or has expired.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Invalid verification code",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleResendCode = async () => {
    setIsResending(true);
    
    try {
      await sendVerificationCode(email, firstName || '');
      
      toast({
        title: "Code Sent",
        description: "A new verification code has been sent to your email.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send verification code",
        variant: "destructive"
      });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="animate-slide-in">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-10rem)]">
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
            <h1 className="text-5xl font-playfair font-bold mb-12">Verify Email</h1>
            
            <div className="space-y-6 max-w-md">
              <p className="mb-4">
                We've sent a 6-digit verification code to <strong>{email}</strong>. 
                Please check your email and enter the code below.
              </p>
              
              <div>
                <label className="block mb-1">Verification Code</label>
                <Input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="glass-input shadow-md"
                />
              </div>
              
              <Button 
                onClick={handleVerification}
                className="btn-black w-full py-3 shadow-md hover:shadow-lg transition-shadow"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Verifying...' : 'Verify Email'}
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Didn't receive the code? Check your spam folder or request a new one.
                </p>
                <Button
                  variant="ghost"
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="text-sm"
                >
                  {isResending ? 'Sending...' : 'Resend verification code'}
                </Button>
              </div>
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
