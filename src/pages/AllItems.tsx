import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FILTER_CATEGORIES = {
  shoes: [
    'Sneakers',
    'Heels',
    'Sandals',
    'Boots',
    'Slippers',
    'Sports Shoes'
  ],
  bags: [
    'Handbags',
    'Backpacks',
    'Crossbody Bags',
    'Tote Bags',
    'Shoulder Bags',
    'Wallets',
    'Laptop Bags'
  ],
  accessories: [
    'Earrings',
    'Necklaces',
    'Bracelets',
    'Watches',
    'Sunglasses',
    'Belts',
    'Hair Accessories'
  ],
  tops: [
    'T-Shirts',
    'Blouses',
    'Shirts',
    'Sweaters',
    'Hoodies'
  ],
  dresses: [
    'Casual Dresses',
    'Party Dresses'
  ],
  jackets: [
    'Denim Jackets',
    'Leather Jackets',
    'Blazers',
    'Puffer Jackets',
    'Long Coats'
  ],
  trousers: [
    'Jeans',
    'Leggings',
    'Wide-leg Pants',
    'Formal Pants'
  ]
};

const SIZES = [
  '36', '37', '38', '39', '40', '41', '42',
  'XS', 'S', 'M', 'L', 'XL'
];

const COLORS = [
  'Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Purple', 
  'Pink', 'Orange', 'Brown', 'Gray', 'Beige', 'Navy', 'Burgundy',
  'Gold', 'Silver', 'Multi'
];

const AllItems = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterColor, setFilterColor] = useState('');
  const [filterSize, setFilterSize] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const availableBrands = [...new Set(products
    .filter(product => !filterCategory || product.category.toLowerCase() === filterCategory.toLowerCase())
    .map(product => product.brand)
    .filter(Boolean))];
  
  const getAvailableTypes = () => {
    if (!filterCategory || !FILTER_CATEGORIES[filterCategory.toLowerCase() as keyof typeof FILTER_CATEGORIES]) {
      return [];
    }
    return FILTER_CATEGORIES[filterCategory.toLowerCase() as keyof typeof FILTER_CATEGORIES];
  };
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.brand && product.brand.toLowerCase().includes(searchTerm.toLowerCase()));
                         
    const matchesCategory = filterCategory === '' || product.category.toLowerCase() === filterCategory.toLowerCase();
    const matchesBrand = filterBrand === '' || product.brand === filterBrand;
    const matchesType = filterType === '' || 
                        (getAvailableTypes().some(type => 
                          product.title.toLowerCase().includes(type.toLowerCase()) || 
                          (product.description && product.description.toLowerCase().includes(type.toLowerCase()))
                        ));
    const matchesColor = filterColor === '' || (product.color && product.color === filterColor);
    const matchesSize = filterSize === '' || (product.size && product.size === filterSize);
    
    return matchesSearch && matchesCategory && matchesBrand && matchesType && matchesColor && matchesSize;
  }).sort((a, b) => {
    if (sortDirection === 'asc') {
      return a.price - b.price;
    } else {
      return b.price - a.price;
    }
  });

  const clearFilters = () => {
    setFilterCategory('');
    setFilterBrand('');
    setFilterType('');
    setFilterColor('');
    setFilterSize('');
  };

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
          
          <div className="flex gap-2 items-center">
            <div className="w-full md:w-auto">
              <select 
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setFilterBrand(''); // Reset brand when category changes
                  setFilterType(''); // Reset type when category changes
                }}
                className="glass-input w-full"
              >
                <option value="">All Categories</option>
                {Object.keys(FILTER_CATEGORIES).map(category => (
                  <option key={category} value={category} className="capitalize">
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <div className="space-y-4">
                  <h4 className="font-medium">Sort by Price</h4>
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
                  
                  {filterCategory && (
                    <>
                      <div>
                        <h4 className="font-medium mb-2">Brand</h4>
                        <select 
                          value={filterBrand}
                          onChange={(e) => setFilterBrand(e.target.value)}
                          className="w-full rounded-md border border-input p-2"
                        >
                          <option value="">All Brands</option>
                          {availableBrands.map(brand => (
                            <option key={brand} value={brand}>{brand}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Type</h4>
                        <select 
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="w-full rounded-md border border-input p-2"
                        >
                          <option value="">All Types</option>
                          {getAvailableTypes().map(type => (
                            <option key={type} value={type}>{type}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-2">Size</h4>
                    <select 
                      value={filterSize}
                      onChange={(e) => setFilterSize(e.target.value)}
                      className="w-full rounded-md border border-input p-2"
                    >
                      <option value="">All Sizes</option>
                      {SIZES.map(size => (
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
                      {COLORS.map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>
                  
                  <Button 
                    onClick={clearFilters} 
                    variant="outline" 
                    className="w-full"
                  >
                    Clear All Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {(filterCategory || filterBrand || filterType || filterColor || filterSize) && (
          <div className="flex flex-wrap gap-2 mb-6">
            {filterCategory && (
              <div className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-sm flex items-center shadow-sm">
                Category: {filterCategory}
                <button 
                  onClick={() => setFilterCategory('')}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            )}
            
            {filterBrand && (
              <div className="bg-white/30 backdrop-blur-sm rounded-full px-3 py-1 text-sm flex items-center shadow-sm">
                Brand: {filterBrand}
                <button 
                  onClick={() => setFilterBrand('')}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
            )}
            
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

export default AllItems;
