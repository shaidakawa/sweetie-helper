
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, ShoppingBag, Users, LogOut, Home } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out of the admin panel."
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className="w-64 bg-oldie-gray text-white">
        <div className="p-4">
          <h1 className="text-2xl font-playfair font-bold">OLDIE Admin</h1>
          <p className="text-sm mt-1 text-gray-300">
            {user?.firstName} {user?.lastName}
          </p>
        </div>

        <nav className="mt-8">
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 ${isActive ? 'bg-oldie-lightgray text-white' : 'text-gray-300 hover:bg-oldie-lightgray hover:text-white'}`
            }
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </NavLink>
          
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 ${isActive ? 'bg-oldie-lightgray text-white' : 'text-gray-300 hover:bg-oldie-lightgray hover:text-white'}`
            }
          >
            <ShoppingBag className="w-5 h-5 mr-3" />
            Products
          </NavLink>
          
          <NavLink 
            to="/admin/users" 
            className={({ isActive }) => 
              `flex items-center px-4 py-3 ${isActive ? 'bg-oldie-lightgray text-white' : 'text-gray-300 hover:bg-oldie-lightgray hover:text-white'}`
            }
          >
            <Users className="w-5 h-5 mr-3" />
            Users
          </NavLink>
          
          <div className="px-4 py-3 text-gray-300 hover:bg-oldie-lightgray hover:text-white cursor-pointer flex items-center" onClick={handleLogout}>
            <LogOut className="w-5 h-5 mr-3" />
            Logout
          </div>

          <NavLink 
            to="/" 
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-oldie-lightgray hover:text-white mt-8"
          >
            <Home className="w-5 h-5 mr-3" />
            Return to Site
          </NavLink>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-x-hidden">
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
