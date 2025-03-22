
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { getProductsByCategory } from '../data/products';
import { Product } from '../types';

const CategoryDetail = () => {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (category) {
      const categoryProducts = getProductsByCategory(category);
      setProducts(categoryProducts);
      setLoading(false);
    }
  }, [category]);
  
  const formattedCategory = category ? category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ') : '';

  return (
    <div className="animate-slide-in py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-playfair font-bold mb-12 mt-8">{formattedCategory}</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
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
        ) : (
          <div className="text-center py-16">
            <p className="text-xl mb-4">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryDetail;
