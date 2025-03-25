
import { Link } from 'react-router-dom';
import { Search, Plus, MessageSquare, User } from 'lucide-react';

const CustomNavbar = () => {
  return (
    <header className="bg-gray-500 text-white py-4 px-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-3xl font-playfair font-bold italic">
          OLDIE
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-xl hover:opacity-80 transition-opacity">
            Home
          </Link>
          <Link to="/about" className="text-xl hover:opacity-80 transition-opacity">
            About
          </Link>
          <Link to="/categories" className="text-xl hover:opacity-80 transition-opacity">
            Categories
          </Link>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Link to="/search" className="hover:opacity-80 transition-opacity">
            <Search className="w-5 h-5" />
          </Link>
          <Link to="/add-item" className="hover:opacity-80 transition-opacity">
            <Plus className="w-5 h-5" />
          </Link>
          <Link to="/messages" className="hover:opacity-80 transition-opacity">
            <MessageSquare className="w-5 h-5" />
          </Link>
          <Link to="/account" className="hover:opacity-80 transition-opacity">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default CustomNavbar;
