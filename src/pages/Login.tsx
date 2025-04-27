
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Check if email is provided from verification or previous route
  const verifiedEmail = location.state?.email;
  
  useEffect(() => {
    // Pre-fill email if it was passed from verification
    if (verifiedEmail) {
      setEmail(verifiedEmail);
    }
  }, [verifiedEmail]);
  
  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back to Oldie!",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid email or password.",
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
            <h1 className="text-5xl font-playfair font-bold mb-12">Login</h1>
            
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
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="glass-input"
                  required
                />
              </div>
              
              <div className="text-right">
                <Link to="/forgot-password" className="text-sm text-oldie-black underline italic">
                  Forgot Password?
                </Link>
              </div>
              
              <div>
                <button 
                  type="submit" 
                  className="btn-black w-full py-3"
                  disabled={isLoading}
                >
                  {isLoading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>
            
            <p className="mt-8">
              <Link to="/signup" className="text-oldie-black underline italic">
                Don't have an account? Sign up
              </Link>
            </p>
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

export default Login;
