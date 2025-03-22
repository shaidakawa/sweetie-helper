
import { Link } from 'react-router-dom';
import { Search, Plus, MessageCircle, User, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated, isAdmin } = useAuth();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-oldie-gray/90 backdrop-blur-md py-3' : 'bg-oldie-gray py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-4xl font-playfair text-white font-bold tracking-wider">
          OLDIE
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="nav-link text-white hover:text-white/90">Home</Link>
          <Link to="/about" className="nav-link text-white hover:text-white/90">About</Link>
          <Link to="/categories" className="nav-link text-white hover:text-white/90">Categories</Link>
          {isAdmin && (
            <Link to="/admin/dashboard" className="nav-link text-white hover:text-white/90 flex items-center gap-1">
              <LayoutDashboard className="w-4 h-4" />
              Admin
            </Link>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/search" className="text-white hover:text-white/80 transition-colors">
            <Search className="w-5 h-5" />
          </Link>
          <Link to="/add-item" className="text-white hover:text-white/80 transition-colors">
            <Plus className="w-5 h-5" />
          </Link>
          <Link to="/messages" className="text-white hover:text-white/80 transition-colors">
            <MessageCircle className="w-5 h-5" />
          </Link>
          <Link to={isAuthenticated ? "/account" : "/login"} className="text-white hover:text-white/80 transition-colors">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
