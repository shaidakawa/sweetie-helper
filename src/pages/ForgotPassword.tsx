
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrPhone: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    // Mock password reset (would connect to backend in a real app)
    toast({
      title: "Password reset successfully!",
      description: "You can now log in with your new password.",
    });
    navigate('/login');
  };

  return (
    <div className="animate-slide-in py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row min-h-[80vh]">
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
            <h1 className="text-5xl font-playfair font-bold mb-12">Forget Password</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
              <div>
                <label className="block mb-1">Email or PhoneNumber</label>
                <input
                  type="text"
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleInputChange}
                  className="glass-input"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Verification Code</label>
                <input
                  type="text"
                  name="verificationCode"
                  value={formData.verificationCode}
                  onChange={handleInputChange}
                  className="glass-input"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className="glass-input"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="glass-input"
                  required
                />
              </div>
              
              <div>
                <button type="submit" className="btn-black w-full py-3">
                  Done
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
