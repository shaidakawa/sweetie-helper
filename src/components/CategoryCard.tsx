
import { Link } from 'react-router-dom';
import { useState } from 'react';

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}

const CategoryCard = ({ title, image, link }: CategoryCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link to={link} className="category-card block rounded-lg overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all bg-white/80 backdrop-blur-sm">
      <div className="relative w-full h-56 overflow-hidden bg-gray-100 flex items-center justify-center">
        {!imageError ? (
          <img 
            src={image} 
            alt={title} 
            className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105" 
            onError={() => {
              console.error(`Failed to load image: ${image}`);
              setImageError(true);
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">Image unavailable</p>
          </div>
        )}
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-medium">{title}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
