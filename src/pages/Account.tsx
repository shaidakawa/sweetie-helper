
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { User as UserIcon, LogOut, Settings } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your account settings have been updated successfully.",
    });
    setIsSettingsOpen(false);
  };

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="animate-slide-in">
      <div className="container mx-auto max-w-4xl py-12">
        <div className="bg-white/70 backdrop-blur-sm rounded-md shadow-lg p-8">
          <div className="flex items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-oldie-gray flex items-center justify-center shadow-md">
              <UserIcon className="w-8 h-8 text-white" />
            </div>
            <div className="ml-4">
              <h1 className="text-3xl font-playfair font-bold">My Account</h1>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass-card p-6 shadow-md hover:shadow-lg">
              <h2 className="text-2xl font-playfair font-bold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-500">Name</p>
                  <p className="font-medium">{user.firstName || ''} {user.lastName || ''}</p>
                </div>
                <div>
                  <p className="text-gray-500">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <p className="text-gray-500">Role</p>
                  <p className="font-medium capitalize">{user.role}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="glass-card p-6 shadow-md hover:shadow-lg">
                <div className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  <h2 className="text-xl font-playfair font-semibold">Account Settings</h2>
                </div>
                <p className="text-gray-600 mt-2">Manage your account settings and preferences</p>
                
                <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
                  <DialogTrigger asChild>
                    <button className="btn-outline w-full mt-4 shadow-md">
                      Manage Settings
                    </button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="text-xl font-playfair">Account Settings</DialogTitle>
                      <DialogDescription>
                        Update your personal information and account preferences
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" defaultValue={user.firstName || ''} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" defaultValue={user.lastName || ''} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={user.email} />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleSaveSettings}>Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="glass-card p-6 shadow-md hover:shadow-lg">
                <div className="flex items-center">
                  <LogOut className="w-5 h-5 mr-2" />
                  <h2 className="text-xl font-playfair font-semibold">Sign Out</h2>
                </div>
                <p className="text-gray-600 mt-2">Sign out from your account</p>
                <button 
                  onClick={handleLogout}
                  className="btn-black w-full mt-4 shadow-md"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
