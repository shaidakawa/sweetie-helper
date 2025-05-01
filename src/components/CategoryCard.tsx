
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}

const CategoryCard = ({ title, image, link }: CategoryCardProps) => {
  return (
    <Link to={link} className="category-card block rounded-lg overflow-hidden shadow-[0_5px_15px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.2)] transition-all bg-white/80 backdrop-blur-sm">
      <div className="relative w-full h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            console.error(`Failed to load image: ${target.src}`);
            target.src = '/placeholder.svg';
          }}
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-medium">{title}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
