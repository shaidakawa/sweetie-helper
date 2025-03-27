
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Filter, SlidersHorizontal } from 'lucide-react';
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
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// Filter categories for products
const FILTER_CATEGORIES = [
  'High Heels', 'Sandals', 'Sneakers', 'Jackets', 'Coats', 
  'Rings', 'Bracelets', 'Necklaces', 'Earrings', 'Watches', 
  'Bags', 'Tote Bags', 'Kurdish Dress'
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [filterType, setFilterType] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterSize, setFilterSize] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const colors = [...new Set(products.map(product => product.color).filter(Boolean))];
  const sizes = [...new Set(products.map(product => product.size).filter(Boolean))];
  const types = [...new Set(products.map(product => product.brand).filter(Boolean))];
  
  const minPrice = Math.min(...products.map(product => product.price));
  const maxPrice = Math.max(...products.map(product => product.price));
  
  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);
  
  const toggleFilter = (filter: string) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  
  const filteredProducts = products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      searchTerm === '' || 
      product.title.toLowerCase().includes(searchLower) || 
      (product.brand && product.brand.toLowerCase().includes(searchLower)) ||
      product.category.toLowerCase().includes(searchLower) ||
      (product.description && product.description.toLowerCase().includes(searchLower));
    
    const matchesFilters = 
      selectedFilters.length === 0 || 
      selectedFilters.some(filter => 
        product.category.toLowerCase() === filter.toLowerCase()
      );
    
    const matchesType = filterType === '' || (product.brand && product.brand === filterType);
    const matchesColor = filterColor === '' || (product.color && product.color === filterColor);
    const matchesSize = filterSize === '' || (product.size && product.size === filterSize);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesFilters && matchesType && matchesColor && matchesSize && matchesPrice;
  }).sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const clearFilters = () => {
    setSelectedFilters([]);
    setFilterType('');
    setFilterColor('');
    setFilterSize('');
    setPriceRange([minPrice, maxPrice]);
    setSortDirection('asc');
  };

  return (
    <div className="animate-slide-in py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-playfair font-bold mb-8 mt-8">Search Items</h1>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <SearchIcon className="w-5 h-5 text-gray-400" />
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
                <SlidersHorizontal className="h-4 w-4" />
                <span>Advanced Filters</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="mx-auto w-full max-w-md">
                <DrawerHeader>
                  <DrawerTitle>Advanced Filters</DrawerTitle>
                  <DrawerDescription>
                    Filter products by category, type, size, color, and price
                  </DrawerDescription>
                </DrawerHeader>
                
                <div className="p-4 space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">Sort by Price</h4>
                    <RadioGroup 
                      value={sortDirection} 
                      onValueChange={(value) => setSortDirection(value as 'asc' | 'desc')}
                      className="flex gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="asc" id="price-asc" />
                        <Label htmlFor="price-asc">Low to High</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="desc" id="price-desc" />
                        <Label htmlFor="price-desc">High to Low</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Filter By Category</h4>
                    <div className="grid grid-cols-2 gap-3">
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
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Type/Brand</h4>
                    <select 
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full rounded-md border border-input p-2"
                    >
                      <option value="">All Types</option>
                      {types.map(type => type && (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Size</h4>
                    <select 
                      value={filterSize}
                      onChange={(e) => setFilterSize(e.target.value)}
                      className="w-full rounded-md border border-input p-2"
                    >
                      <option value="">All Sizes</option>
                      {sizes.map(size => size && (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Color</h4>
                    <select 
                      value={filterColor}
                      onChange={(e) => setFilterColor(e.target.value)}
                      className="w-full rounded-md border border-input p-2"
                    >
                      <option value="">All Colors</option>
                      {colors.map(color => color && (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Price Range</h4>
                    <div className="pt-4">
                      <Slider
                        defaultValue={[minPrice, maxPrice]}
                        value={priceRange}
                        max={maxPrice}
                        min={minPrice}
                        step={1}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                      />
                      <div className="flex justify-between mt-2 text-sm">
                        <div>${priceRange[0].toFixed(2)}</div>
                        <div>${priceRange[1].toFixed(2)}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <DrawerFooter>
                  <Button 
                    onClick={clearFilters}
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
        
        {/* Filter chips */}
        {(selectedFilters.length > 0 || filterType || filterColor || filterSize || 
          priceRange[0] > minPrice || priceRange[1] < maxPrice || sortDirection === 'desc') && (
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedFilters.map(filter => (
              <div key={filter} className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-sm flex items-center shadow-sm">
                {filter}
                <button 
                  onClick={() => toggleFilter(filter)}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            ))}
            
            {filterType && (
              <div className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-sm flex items-center shadow-sm">
                Type: {filterType}
                <button 
                  onClick={() => setFilterType('')}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            )}
            
            {filterColor && (
              <div className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-sm flex items-center shadow-sm">
                Color: {filterColor}
                <button 
                  onClick={() => setFilterColor('')}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            )}
            
            {filterSize && (
              <div className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-sm flex items-center shadow-sm">
                Size: {filterSize}
                <button 
                  onClick={() => setFilterSize('')}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            )}
            
            {(priceRange[0] > minPrice || priceRange[1] < maxPrice) && (
              <div className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-sm flex items-center shadow-sm">
                Price: ${priceRange[0].toFixed(2)} - ${priceRange[1].toFixed(2)}
                <button 
                  onClick={() => setPriceRange([minPrice, maxPrice])}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            )}
            
            {sortDirection === 'desc' && (
              <div className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-sm flex items-center shadow-sm">
                Price: High to Low
                <button 
                  onClick={() => setSortDirection('asc')}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            )}
            
            <button
              onClick={clearFilters}
              className="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              Clear all
            </button>
          </div>
        )}
        
        <div className="mb-4 text-sm text-gray-500">
          {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''} found
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

export default Search;
