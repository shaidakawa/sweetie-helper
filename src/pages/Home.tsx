
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import CategorySlider from '../components/CategorySlider';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState(products.slice(0, 3));
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <div className="animate-slide-in">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-oldie-lightgray">
        <div className="absolute inset-0 flex items-center">
          <div className="w-1/3 h-full flex items-center justify-end pr-10">
            <img src="/lovable-uploads/14135fb0-35e2-4127-9013-74bd241d6182.png" alt="Product" className="h-3/4 object-contain" />
          </div>
          <div className="w-1/3 h-full flex items-center justify-center">
            <img src="/lovable-uploads/4fba6377-92cb-4d75-aef5-f835ee67b750.png" alt="Product" className="h-3/4 object-contain" />
          </div>
          <div className="w-1/3 h-full flex items-center justify-start pl-10">
            <img src="/lovable-uploads/8a0eda7d-131b-4967-b704-43f6627119b5.png" alt="Product" className="h-3/4 object-contain" />
          </div>
        </div>
      
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 tracking-wide leading-tight">
            ReWear. ReLove. ReStyle
          </h1>
          <p className="text-2xl mb-4 italic">Sutainable fashion, timelesss style.</p>
          <p className="text-xl mb-8">Shop pre-loved, look great, and waste lesss!</p>
          
          <div className="flex justify-center">
            <div className="relative max-w-md w-full">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input 
                type="text" 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="pl-10 pr-4 py-3 w-full glass-input" 
                placeholder="Search for items..."
              />
              <div className="absolute inset-y-0 right-0 flex items-center">
                <button className="h-full px-4 bg-oldie-black text-white rounded-r-sm">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold mb-12 text-center">Categories</h2>
          <CategorySlider />
          <div className="flex justify-center mt-8">
            <Link to="/categories" className="btn-black">
              Shop All
            </Link>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold mb-12 text-center">Featured Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard 
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                category={product.category}
              />
            ))}
          </div>
          <div className="flex justify-center mt-12">
            <Link to="/all-items" className="btn-black">
              View All Items
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
