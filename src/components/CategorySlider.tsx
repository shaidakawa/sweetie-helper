
import { useState, useRef, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  {
    id: '1',
    title: 'Accessories',
    image: '/lovable-uploads/f6f191f4-a404-40c7-9c98-eec4fb538b2b.png',
    link: '/categories/accessories'
  },
  {
    id: '2',
    title: 'Dress',
    image: '/lovable-uploads/b9930b3e-e649-4466-9077-cfd1ca45bcc6.png',
    link: '/categories/dress'
  },
  {
    id: '3',
    title: 'Kurdish Dresses',
    image: '/lovable-uploads/1db5a679-eae7-4639-abcf-dbe2bbe81c15.png',
    link: '/categories/kurdish-dresses'
  },
  {
    id: '4',
    title: 'Shoes',
    image: '/lovable-uploads/e24ff725-05d9-43ac-b21e-ec873c94542d.png',
    link: '/categories/shoes'
  },
  {
    id: '5',
    title: 'Bags',
    image: '/lovable-uploads/0eacf8eb-cea5-4173-bc5f-92f8676dd6fc.png',
    link: '/categories/bags'
  },
  {
    id: '6',
    title: 'Tops',
    image: '/lovable-uploads/04c05ae9-15d7-432d-a071-f9cc77f68a2c.png',
    link: '/categories/tops'
  },
  {
    id: '7',
    title: 'Trousers',
    image: '/lovable-uploads/3777202a-eaa7-4595-849d-65b8d60f1ce4.png',
    link: '/categories/trousers'
  },
  {
    id: '8',
    title: 'Jackets',
    image: '/lovable-uploads/0028fadc-b346-4ac0-b49f-7c6118614438.png',
    link: '/categories/jackets'
  }
];

const CategorySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  const sliderRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, categories.length - slidesToShow) : prevIndex - 1
    );
  };
  
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === Math.max(0, categories.length - slidesToShow) ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full py-8">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-transparent backdrop-blur-sm shadow-[0_5px_10px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      
      <div 
        ref={sliderRef}
        className="category-slider overflow-hidden"
      >
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
        >
          {categories.map((category) => (
            <div 
              key={category.id}
              className="px-4"
              style={{ 
                flex: `0 0 ${100 / slidesToShow}%`,
                width: `${100 / slidesToShow}%`
              }}
            >
              <CategoryCard 
                title={category.title}
                image={category.image}
                link={category.link}
              />
            </div>
          ))}
        </div>
      </div>
      
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
        <button 
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-transparent backdrop-blur-sm shadow-[0_5px_10px_rgba(0,0,0,0.2)] flex items-center justify-center hover:bg-white/10 transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CategorySlider;
