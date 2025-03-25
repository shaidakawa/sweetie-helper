
import { Link } from 'react-router-dom';
import { Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';

const CustomFooter = () => {
  return (
    <footer className="bg-white py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between mb-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="text-3xl font-playfair font-bold italic block mb-4">
              OLDIE
            </Link>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Categories</h3>
              <ul className="space-y-2">
                <li><Link to="/categories" className="text-gray-600 hover:text-gray-900">Categories</Link></li>
                <li><Link to="/categories/accessories" className="text-gray-600 hover:text-gray-900">Accessories</Link></li>
                <li><Link to="/categories/shoes" className="text-gray-600 hover:text-gray-900">Shoes</Link></li>
                <li><Link to="/categories/bags" className="text-gray-600 hover:text-gray-900">Bags</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Tops</h3>
              <ul className="space-y-2">
                <li><Link to="/categories/tops" className="text-gray-600 hover:text-gray-900">Tops</Link></li>
                <li><Link to="/categories/trousers" className="text-gray-600 hover:text-gray-900">Trousers</Link></li>
                <li><Link to="/categories/jackets" className="text-gray-600 hover:text-gray-900">Jackets</Link></li>
                <li><Link to="/categories/dresses" className="text-gray-600 hover:text-gray-900">Dresses</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4">Kurdish Dresses</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link></li>
                <li><Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default CustomFooter;
