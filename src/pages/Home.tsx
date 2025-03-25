
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/products';

const categoryImages = [
  {
    id: '1',
    title: 'Accessories',
    image: '/lovable-uploads/08e778bf-4ec8-4d76-b502-2c5a8cd34813.png',
    link: '/categories/accessories'
  },
  {
    id: '2',
    title: 'Dress',
    image: '/lovable-uploads/d0eca0ac-b671-433f-a088-a643c37ff819.png',
    link: '/categories/dress'
  },
  {
    id: '3',
    title: 'Kurdish Dresses',
    image: '/lovable-uploads/6db6afbc-70d9-40b6-84cd-96e02122b8c5.png',
    link: '/categories/kurdish-dresses'
  }
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const prevCategory = () => {
    setCurrentIndex(prev => 
      prev === 0 ? categoryImages.length - 1 : prev - 1
    );
  };
  
  const nextCategory = () => {
    setCurrentIndex(prev => 
      prev === categoryImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="bg-gray-300 min-h-screen">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 tracking-wide leading-tight italic">
            ReWear. ReLove. ReStyle
          </h1>
          <p className="text-xl mb-4 italic">Sutainable fashion, timelesss style.</p>
          <p className="text-xl mb-8">Shop pre-loved, look great, and waste less!</p>
          
          <div className="relative max-w-md mx-auto mt-8">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 pl-10 pr-8 rounded-full bg-white/80 border-none focus:outline-none"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <Search className="h-5 w-5 text-gray-500" />
            </div>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
              <button className="h-5 w-5 text-gray-500">
                <span className="sr-only">Filter</span>
                ≡
              </button>
            </div>
          </div>
        </div>
        
        {/* Featured products display */}
        <div className="container mx-auto mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 row-span-2">
            <img 
              src="/lovable-uploads/50ac75b1-383d-40ee-a46b-f2b9179d8d71.png"
              alt="Denim jacket" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <img 
              src="/lovable-uploads/08e778bf-4ec8-4d76-b502-2c5a8cd34813.png"
              alt="High heels" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <img 
              src="/lovable-uploads/d0eca0ac-b671-433f-a088-a643c37ff819.png"
              alt="Boots" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="col-span-2">
            <img 
              src="/lovable-uploads/6db6afbc-70d9-40b6-84cd-96e02122b8c5.png"
              alt="Tote bag" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-playfair font-bold mb-12 text-center">Categories</h2>
          
          <div className="relative">
            <button 
              onClick={prevCategory}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 rounded-full p-2"
              aria-label="Previous category"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <div className="flex justify-center">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
                {categoryImages.map((category, index) => (
                  <Link 
                    key={category.id} 
                    to={category.link}
                    className={`block ${index === currentIndex ? 'opacity-100' : 'opacity-100 md:opacity-70'}`}
                  >
                    <div className="overflow-hidden">
                      <img 
                        src={category.image} 
                        alt={category.title} 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <div className="text-center mt-2">
                      <h3 className="text-xl font-medium">{category.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            <button 
              onClick={nextCategory}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-70 rounded-full p-2"
              aria-label="Next category"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
          
          <div className="text-center mt-8">
            <Link to="/categories" className="inline-block px-6 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors">
              Shop All
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
