
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

type FormData = {
  email: string;
  code?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { resetPassword, resetPasswordWithCode } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<'sendEmail' | 'enterCode'>('sendEmail');
  const [email, setEmail] = useState('');
  
  const form = useForm<FormData>({
    defaultValues: {
      email: '',
      code: '',
      newPassword: '',
      confirmPassword: ''
    }
  });
  
  const handleSendResetEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await resetPassword(email);
      toast({
        title: "Reset code sent",
        description: "Please check your email for password reset code.",
      });
      setStep('enterCode');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred while sending the reset code.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (data: FormData) => {
    if (!data.code || !data.newPassword || !data.confirmPassword) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (data.newPassword !== data.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await resetPasswordWithCode(email, data.code, data.newPassword);
      toast({
        title: "Password reset successful",
        description: "You can now log in with your new password.",
      });
      navigate('/login');
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred while resetting your password.",
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
            
            {step === 'sendEmail' ? (
              <form onSubmit={handleSendResetEmail} className="space-y-6 max-w-md">
                <div>
                  <label className="block mb-1">Email</label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-input"
                    required
                  />
                </div>
                
                <div>
                  <Button 
                    type="submit" 
                    className="btn-black w-full py-3"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Reset Code'}
                  </Button>
                </div>
              </form>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleResetPassword)} className="space-y-6 max-w-md">
                  <div>
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Reset Code</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              placeholder="Enter 6-digit code" 
                              className="glass-input"
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <FormField
                      control={form.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="password"
                              placeholder="Enter new password" 
                              className="glass-input"
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input 
                              {...field} 
                              type="password"
                              placeholder="Confirm new password" 
                              className="glass-input"
                              required
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      className="btn-black w-full py-3"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Resetting...' : 'Reset Password'}
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </div>
          
          <div className="hidden md:flex md:w-1/2 items-center justify-center">
            <div className="w-4/5 h-4/5">
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

export default ForgotPassword;
