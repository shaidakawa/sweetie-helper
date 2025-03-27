
import { useState, useRef, useEffect } from 'react';
import CategoryCard from './CategoryCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  {
    id: '1',
    title: 'Accessories',
    image: '/lovable-uploads/197998cf-409e-4bc4-b4a8-44efbd64db4a.png',
    link: '/categories/accessories'
  },
  {
    id: '2',
    title: 'Dress',
    image: '/lovable-uploads/35f2fd4f-a2aa-4fe4-95a8-fe165c7ac7df.png',
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
    image: '/lovable-uploads/4fba6377-92cb-4d75-aef5-f835ee67b750.png',
    link: '/categories/shoes'
  },
  {
    id: '5',
    title: 'Bags',
    image: '/lovable-uploads/209ed3f3-b251-45fe-af6f-cbbac1f1ccf3.png',
    link: '/categories/bags'
  },
  {
    id: '6',
    title: 'Tops',
    image: '/lovable-uploads/f8e6b2b4-ec0a-4670-91fe-0993320cc78b.png',
    link: '/categories/tops'
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
          className="w-10 h-10 rounded-full bg-[rgba(201,201,199,0.7)] backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-[rgba(201,201,199,0.9)] transition-colors"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>
      
      <div 
        ref={sliderRef}
        className="category-slider"
      >
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
        >
          {categories.map((category) => (
            <div 
              key={category.id}
              className={`w-full min-w-[${100 / slidesToShow}%] px-4`}
              style={{ flex: `0 0 ${100 / slidesToShow}%` }}
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
          className="w-10 h-10 rounded-full bg-[rgba(201,201,199,0.7)] backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-[rgba(201,201,199,0.9)] transition-colors"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CategorySlider;
