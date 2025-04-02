
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-oldie-gray py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <Link to="/" className="text-4xl font-playfair text-white font-bold tracking-wider">
              OLDIE
            </Link>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-white hover:text-white/80 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-white mb-4 font-bold">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/categories/accessories" className="text-white/80 hover:text-white transition-colors">Accessories</Link></li>
              <li><Link to="/categories/shoes" className="text-white/80 hover:text-white transition-colors">Shoes</Link></li>
              <li><Link to="/categories/bags" className="text-white/80 hover:text-white transition-colors">Bags</Link></li>
              <li><Link to="/categories/kurdish-dresses" className="text-white/80 hover:text-white transition-colors">Kurdish Dresses</Link></li>
              <li><Link to="/categories/tops" className="text-white/80 hover:text-white transition-colors">Tops</Link></li>
              <li><Link to="/categories/trousers" className="text-white/80 hover:text-white transition-colors">Trousers</Link></li>
              <li><Link to="/categories/jackets" className="text-white/80 hover:text-white transition-colors">Jackets</Link></li>
              <li><Link to="/categories/dresses" className="text-white/80 hover:text-white transition-colors">Dresses</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-lg font-medium text-white mb-4 font-bold">Navigation</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-white/80 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-white/80 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/all-items" className="text-white/80 hover:text-white transition-colors">All Items</Link></li>
              <li><Link to="/login" className="text-white/80 hover:text-white transition-colors">Login</Link></li>
              <li><Link to="/signup" className="text-white/80 hover:text-white transition-colors">Sign Up</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
