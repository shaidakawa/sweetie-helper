
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

const AddItem = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: '',
    brand: '',
    color: '',
    size: '',
    location: '',
    price: '',
    fibId: '',
    description: ''
  });
  const [image, setImage] = useState<string | null>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!image) {
      toast({
        title: "Image required",
        description: "Please upload an image of your item.",
        variant: "destructive"
      });
      return;
    }
    
    // Mock item creation (would connect to backend in a real app)
    toast({
      title: "Item listed successfully!",
      description: "Your item has been added and is now available for sale.",
    });
    navigate('/');
  };

  // Custom input class for our enhanced inputs with shadows and rounded borders
  const inputClass = "glass-input shadow-md rounded-md focus:shadow-lg transition-shadow";

  return (
    <div className="animate-slide-in py-10">
      <div className="bg-oldie-gray py-6 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-playfair font-bold text-white text-center">Add Your Items For Sell</h1>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="mb-8">
            <label className="block text-xl mb-2">Add Item Image</label>
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer shadow-md hover:shadow-lg transition-shadow" onClick={() => document.getElementById('itemImage')?.click()}>
              {image ? (
                <img src={image} alt="Item preview" className="max-h-60 object-contain" />
              ) : (
                <div className="text-center">
                  <Plus className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-500">Click to upload an image</p>
                </div>
              )}
              <input 
                type="file" 
                id="itemImage" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={inputClass}
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className={inputClass}
                required
              >
                <option value="">Select a category</option>
                <option value="Shoes">Shoes</option>
                <option value="Dress">Dress</option>
                <option value="Kurdish Dress">Kurdish Dress</option>
                <option value="Accessories">Accessories</option>
                <option value="Bags">Bags</option>
                <option value="Top">Top</option>
                <option value="Trousers">Trousers</option>
                <option value="Jackets">Jackets</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-1">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className={inputClass}
                required
              />
            </div>
            
            <div>
              <label className="block mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-1">Size</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                className={inputClass}
              />
            </div>
            
            <div>
              <label className="block mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className={inputClass}
                required
                min="0"
                step="0.01"
              />
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block mb-1">FIB ID</label>
            <input
              type="text"
              name="fibId"
              value={formData.fibId}
              onChange={handleInputChange}
              className={inputClass}
              required
            />
          </div>
          
          <div className="mb-8">
            <label className="block mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={`${inputClass} min-h-[150px]`}
              required
            />
          </div>
          
          <div className="flex justify-end">
            <button type="submit" className="btn-black py-3 px-10">
              Done
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
