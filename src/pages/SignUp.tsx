
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailOrPhone: '',
    password: '',
    confirmPassword: '',
    verificationCode: ''
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
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    // Mock signup (would connect to backend in a real app)
    toast({
      title: "Account created successfully!",
      description: "Welcome to OLDIE. You can now log in with your credentials.",
    });
    navigate('/login');
  };

  return (
    <div className="animate-slide-in">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-10rem)]">
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
            <h1 className="text-5xl font-playfair font-bold mb-12">Sign UP</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
              <div>
                <label className="block mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="glass-input shadow-md"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="glass-input shadow-md"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Email or PhoneNumber</label>
                <input
                  type="text"
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleInputChange}
                  className="glass-input shadow-md"
                  required
                />
              </div>
              
              <div>
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="glass-input shadow-md"
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
                  className="glass-input shadow-md"
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
                  className="glass-input shadow-md"
                  required
                />
              </div>
              
              <div>
                <button type="submit" className="btn-black w-full py-3 shadow-md hover:shadow-lg transition-shadow">
                  Create Account
                </button>
              </div>
            </form>
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

export default SignUp;
