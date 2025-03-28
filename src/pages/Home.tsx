
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
        <div className="container mx-auto px-4 relative z-10 text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 tracking-wide leading-tight">
            ReWear. ReLove. ReStyle
          </h1>
          <p className="text-2xl mb-4 italic">Sustainable fashion, timeless style.</p>
          <p className="text-xl mb-8">Shop pre-loved, look great, and waste less!</p>
        </div>
        
        {/* Product images - styled with soft shadows and transitions */}
        <div className="container px-4 flex flex-wrap md:flex-nowrap items-end justify-between gap-4 mt-10">
          <div className="w-full md:w-1/4 flex items-center justify-center">
            {/* Tote bag with cherry blossoms */}
            <div className="relative group">
              <div className="absolute inset-0 bg-pink-100 rounded-lg blur opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/ddfb8c83-9afa-44de-820b-84e328b33679.png" 
                  alt="Tote bag with cherry blossoms" 
                  className="h-64 object-contain" 
                />
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/4 flex items-center justify-center">
            {/* Black leather boots */}
            <div className="relative group mt-8">
              <div className="absolute inset-0 bg-gray-100 rounded-lg blur opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/bc8fbe6b-d114-412c-8586-3398e019dba4.png" 
                  alt="Black leather boots" 
                  className="h-64 object-contain" 
                />
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/4 flex items-center justify-center">
            {/* Denim jacket */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-100 rounded-lg blur opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/33283ddb-0efa-47cc-addf-eea8f376512e.png" 
                  alt="Denim jacket" 
                  className="h-64 object-contain" 
                />
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/4 flex items-center justify-center">
            {/* Black stiletto heels */}
            <div className="relative group mt-12">
              <div className="absolute inset-0 bg-gray-100 rounded-lg blur opacity-30 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-white/50 backdrop-blur-sm p-4 rounded-lg shadow-lg transform transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl overflow-hidden">
                <img 
                  src="/lovable-uploads/0ddf888a-b07f-4c1d-b007-f2f8762a24f9.png" 
                  alt="Black stiletto heels" 
                  className="h-64 object-contain" 
                />
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
