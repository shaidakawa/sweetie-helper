
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  description: string;
}

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // Filter products by category
    const filteredProducts = products.filter(
      product => product.category.toLowerCase() === (category || '').toLowerCase()
    );
    setCategoryProducts(filteredProducts);
  }, [category]);
  
  return (
    <div className="bg-gray-300 min-h-screen py-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-playfair font-bold mb-10">{category}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryProducts.map((product) => (
            <Link 
              key={product.id} 
              to={`/product/${product.id}`} 
              className="block bg-gray-200 rounded-md overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-60 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600">{product.category}</p>
                <h3 className="text-lg font-medium">{product.title}</h3>
                <p className="text-lg">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
        
        {categoryProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
