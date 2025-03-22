
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

// Filter categories for products
const FILTER_CATEGORIES = [
  'High Heels', 'Sandals', 'Sneakers', 'Jackets', 'Coats', 
  'Rings', 'Bracelets', 'Necklaces', 'Earrings', 'Watches', 
  'Bags', 'Tote Bags', 'Kurdish Dress'
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  
  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      searchTerm === '' || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase())) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = 
      selectedFilters.length === 0 || 
      selectedFilters.some(filter => 
        product.category.toLowerCase().includes(filter.toLowerCase()) ||
        (product.title && product.title.toLowerCase().includes(filter.toLowerCase()))
      );
    
    return matchesSearch && matchesFilters;
  });

  return (
    <div className="animate-slide-in py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-playfair font-bold mb-8 mt-8">Search Items</h1>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for items..."
              className="pl-10 pr-4 py-3 w-full glass-input rounded-md border border-input bg-background"
            />
          </div>
          
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <span>Filters {selectedFilters.length > 0 && `(${selectedFilters.length})`}</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-md">
                <DrawerHeader>
                  <DrawerTitle>Filter By Category</DrawerTitle>
                  <DrawerDescription>
                    Select categories to filter products
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 grid grid-cols-2 gap-3">
                  {FILTER_CATEGORIES.map((filter) => (
                    <Button
                      key={filter}
                      variant={selectedFilters.includes(filter) ? "default" : "outline"}
                      onClick={() => toggleFilter(filter)}
                      className="justify-start"
                    >
                      {filter}
                    </Button>
                  ))}
                </div>
                <DrawerFooter>
                  <Button 
                    onClick={() => setSelectedFilters([])}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                  <DrawerClose asChild>
                    <Button>Apply Filters</Button>
                  </DrawerClose>
                </DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
        
        {selectedFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedFilters.map(filter => (
              <div key={filter} className="bg-oldie-lightgray rounded-full px-3 py-1 text-sm flex items-center">
                {filter}
                <button 
                  onClick={() => toggleFilter(filter)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={() => setSelectedFilters([])}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear all
            </button>
          </div>
        )}
        
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

export default Search;
