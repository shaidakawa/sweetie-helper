
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
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
    
    // Mock login (would connect to backend in a real app)
    if (formData.username && formData.password) {
      toast({
        title: "Logged in successfully!",
        description: "Welcome back to OLDIE.",
      });
      navigate('/');
    } else {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="animate-slide-in py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row min-h-[80vh]">
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
            <h1 className="text-5xl font-playfair font-bold mb-12">Log In</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
              <div>
                <label className="block mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="glass-input"
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
                  className="glass-input"
                  required
                />
              </div>
              
              <div>
                <Link to="/forgot-password" className="text-oldie-black underline italic">
                  Forgot Your Password?
                </Link>
              </div>
              
              <div>
                <button type="submit" className="btn-black w-full py-3">
                  Log In
                </button>
              </div>
            </form>
            
            <p className="mt-8">
              <Link to="/signup" className="text-oldie-black underline italic">
                Sign Up if you don't have an account.
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
