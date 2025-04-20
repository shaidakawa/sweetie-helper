
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await resetPassword(email);
      toast({
        title: "Reset link sent",
        description: "Please check your email for password reset instructions.",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred while sending the reset link.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-slide-in py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row min-h-[80vh]">
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
            <h1 className="text-5xl font-playfair font-bold mb-12">Reset Password</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-input"
                  required
                />
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="btn-black w-full py-3"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </div>
            </form>
          </div>
          
          <div className="hidden md:block w-1/2">
            <div className="h-full">
              <img 
                src="/lovable-uploads/6db6afbc-70d9-40b6-84cd-96e02122b8c5.png" 
                alt="Clothes rack" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
