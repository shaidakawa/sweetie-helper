
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const EmailVerification = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();

  // Extract email from location state
  const email = location.state?.email;

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
    try {
      await verifyEmail(email, verificationCode);
      
      toast({
        title: "Email Verified",
        description: "Your email has been successfully verified. You can now log in.",
      });
      
      navigate('/login', { state: { email } });
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: error instanceof Error ? error.message : "Invalid verification code",
        variant: "destructive"
      });
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
              >
                Verify Email
              </Button>
              
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Didn't receive the code? Check your spam folder or request a new one.
                </p>
              </div>
            </div>
          </div>
          
          <div className="hidden md:block md:w-1/2 h-[calc(100vh-10rem)]">
            <img 
              src="/lovable-uploads/6db6afbc-70d9-40b6-84cd-96e02122b8c5.png" 
              alt="Clothes rack" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
