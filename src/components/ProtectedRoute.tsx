
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'user' | 'admin';
}

const ProtectedRoute = ({ children, requiredRole = 'user' }: ProtectedRouteProps) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    toast({
      title: "Access denied",
      description: "You need to log in to access this page.",
      variant: "destructive"
    });
    return <Navigate to="/login" replace />;
  }
  
  if (requiredRole === 'admin' && !isAdmin) {
    toast({
      title: "Admin access required",
      description: "You don't have permission to access this area.",
      variant: "destructive"
    });
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
