
import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

const AllItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  
  const categories = [...new Set(products.map(product => product.category))];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()));
                           
    const matchesCategory = filterCategory === '' || product.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-slide-in py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-playfair font-bold mb-8 mt-8">All Items</h1>
        
        <div className="flex flex-col md:flex-row justify-between mb-10 gap-4">
          <div className="w-full md:w-1/2">
            <input 
              type="text"
              placeholder="Search by name, brand or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="glass-input w-full"
            />
          </div>
          
          <div className="w-full md:w-1/4">
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="glass-input w-full"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
        
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
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
            <p className="text-xl">No items found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllItems;
