
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CategorySlider from '../components/CategorySlider';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState(products.slice(0, 3));
  
  return (
    <div 
      className="animate-slide-in"
      style={{
        background: "radial-gradient(100.93% 55.95% at 50.02% 44.05%, rgba(201, 201, 199, 0.3) 0%, rgba(99, 99, 98, 0.5) 100%)"
      }}
    >
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden pb-16 pt-6">
        <div className="container mx-auto px-4 relative z-10 text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 tracking-wide leading-tight">
            ReWear. ReLove. ReStyle
          </h1>
          <p className="text-2xl mb-4 italic">Sutainable fashion, timelesss style.</p>
          <p className="text-xl mb-8">Shop pre-loved, look great, and waste lesss!</p>
          
          {/* Search bar like in the design */}
          <div className="max-w-md mx-auto mb-10">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full py-2 px-4 rounded-full bg-white/80 backdrop-blur-sm"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        {/* Product images completely redesigned to match the reference image */}
        <div className="container px-4 grid grid-cols-12 gap-4">
          {/* Left - Denim jacket (much larger) */}
          <div className="col-span-8 flex items-center justify-center">
            <div className="w-full h-[600px] flex justify-center items-center">
              <img 
                src="/lovable-uploads/51486f5d-b0c3-4a0f-a2b6-60645c4a6631.png" 
                alt="Denim jacket" 
                className="object-contain max-h-[600px] drop-shadow-[0_8px_15px_rgba(0,0,0,0.3)]" 
              />
            </div>
          </div>
          
          {/* Right column layout - reduced width */}
          <div className="col-span-4 flex flex-col space-y-4">
            {/* Top row - Two shoes side by side */}
            <div className="flex space-x-4">
              {/* Left shoe - Single heel without background */}
              <div className="bg-transparent backdrop-blur-[2px] rounded-md p-2 flex justify-center items-center h-[140px] w-[140px]">
                <img 
                  src="/lovable-uploads/b90bc855-30a5-407b-a04f-1befb2147ddc.png" 
                  alt="Black high heel" 
                  className="max-h-[110px] object-contain" 
                  style={{ filter: "drop-shadow(0 0 8px rgba(0,0,0,0.1))" }}
                />
              </div>
              
              {/* Right shoe - Boots with no background (significantly larger than single heel) */}
              <div className="flex justify-center items-center h-[160px] w-[220px]">
                <img 
                  src="/lovable-uploads/4d8d5bc5-9351-49d3-b9b4-8c7652efafe6.png" 
                  alt="Black leather boots" 
                  className="max-h-[180px] object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.25)]" 
                />
              </div>
            </div>
            
            {/* Bottom row - Updated tote bag with very thin white border */}
            <div className="flex justify-center items-center h-[350px] overflow-hidden w-full bg-white p-1 rounded-md border border-white/70 shadow-md">
              <img 
                src="/lovable-uploads/3ec1cc74-a602-4e03-8513-13f6ee5ab5bc.png" 
                alt="Tote bag" 
                className="w-full h-full object-contain" 
              />
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
            <Link to="/categories" className="btn-black shadow-md hover:shadow-lg transition-shadow">
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
            <Link to="/all-items" className="btn-black shadow-md hover:shadow-lg transition-shadow">
              View All Items
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
