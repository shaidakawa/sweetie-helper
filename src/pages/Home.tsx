
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
          <p className="text-2xl mb-4 italic">Sutainable fashion, timelesss style.</p>
          <p className="text-xl mb-8">Shop pre-loved, look great, and waste lesss!</p>
        </div>
        
        {/* Product images - positioned higher with larger size and shadows */}
        <div className="container px-4 flex items-end justify-between mt-10">
          <div className="w-1/3 flex items-center justify-end">
            {/* Left image - vintage shoes */}
            <img 
              src="/lovable-uploads/14135fb0-35e2-4127-9013-74bd241d6182.png" 
              alt="Vintage shoes" 
              className="h-80 object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.25)]" 
            />
          </div>
          <div className="w-1/3 flex items-center justify-center">
            {/* Center image - denim jacket (without background) */}
            <img 
              src="/lovable-uploads/51486f5d-b0c3-4a0f-a2b6-60645c4a6631.png" 
              alt="Denim jacket" 
              className="h-96 object-contain drop-shadow-[0_8px_15px_rgba(0,0,0,0.3)]" 
            />
          </div>
          <div className="w-1/3 flex items-center justify-start">
            {/* Right image - vintage bag */}
            <img 
              src="/lovable-uploads/8a0eda7d-131b-4967-b704-43f6627119b5.png" 
              alt="Vintage bag" 
              className="h-80 object-contain drop-shadow-[0_5px_10px_rgba(0,0,0,0.25)]" 
            />
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
