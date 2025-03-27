
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  title: string;
  image: string;
  link: string;
}

const CategoryCard = ({ title, image, link }: CategoryCardProps) => {
  return (
    <Link to={link} className="category-card shadow-md hover:shadow-lg transition-all">
      <div className="overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-105" 
        />
      </div>
      <div className="p-4 text-center">
        <h3 className="text-xl font-medium">{title}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;
