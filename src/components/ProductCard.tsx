
import { Link } from 'react-router-dom';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
}

const ProductCard = ({ id, title, price, image, category }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`} className="product-card block">
      <div className="overflow-hidden h-60 rounded-md">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <div className="mt-3">
        <p className="text-sm text-oldie-gray mb-1">{category}</p>
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-lg">${price.toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
