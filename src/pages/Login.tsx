
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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
    setIsLoading(true);
    
    try {
      await login(formData.username, formData.password);
      toast({
        title: "Logged in successfully!",
        description: "Welcome back to OLDIE.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Please check your credentials and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-slide-in">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row min-h-[calc(100vh-10rem)]">
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
            <h1 className="text-5xl font-playfair font-bold mb-12">Log In</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
              <div>
                <label className="block mb-1">Email</label>
                <input
                  type="email"
                  name="username"
                  value={formData.username}
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
                <Link to="/forgot-password" className="text-oldie-black underline italic">
                  Forgot Your Password?
                </Link>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="btn-black w-full py-3 shadow-md hover:shadow-lg transition-shadow"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Log In'}
                </button>
              </div>
            </form>
            
            <p className="mt-8">
              <Link to="/signup" className="text-oldie-black underline italic">
                Sign Up if you don't have an account.
              </Link>
            </p>
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

export default Login;
