
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '../context/AuthContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    try {
      console.log("Starting signup process...");
      const { email, firstName } = await signup(
        formData.email, 
        formData.password, 
        formData.firstName, 
        formData.lastName
      );
      
      console.log("Signup successful, navigating to verification page");
      
      toast({
        title: "Account created",
        description: "Please check your email to verify your account.",
      });
      
      // Navigate to email verification page with email in state
      navigate('/verify-email', { state: { email, firstName } });
    } catch (error) {
      console.error('Signup error:', error);
      let errorMessage = "An error occurred during sign up.";
      
      if (error instanceof Error) {
        errorMessage = error.message;
        
        if (error.message.includes('User already registered')) {
          errorMessage = "Creating another account with this email...";
          // Don't return here - let the process complete as the backend will handle it
        } else {
          // For all other errors, we reset isLoading and show the error message
          setIsLoading(false);
          toast({
            title: "Sign up issue",
            description: errorMessage,
            variant: "destructive"
          });
          return; // Exit early for other errors
        }
      }
      
      // Only show this toast for "User already registered" flow that continues
      if (errorMessage.includes("Creating another account")) {
        toast({
          title: "Sign up process",
          description: errorMessage
        });
      }
    } finally {
      // Ensure loading state is always reset if we reach this point
      // This acts as a safety net in case the try/catch doesn't handle all cases
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-slide-in">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-10rem)]">
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
            <h1 className="text-5xl font-playfair font-bold mb-12">Sign Up</h1>
            
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
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
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
                <button 
                  type="submit" 
                  className="btn-black w-full py-3 shadow-md hover:shadow-lg transition-shadow"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </button>
              </div>
            </form>
            
            <p className="mt-8">
              <Link to="/login" className="text-oldie-black underline italic">
                Already have an account? Log in
              </Link>
            </p>
          </div>
          
          <div className="hidden md:block md:w-1/2 h-[calc(100vh-10rem)]">
            <img 
              src="/lovable-uploads/login.jpg" 
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
