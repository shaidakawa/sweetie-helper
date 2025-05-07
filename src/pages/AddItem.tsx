import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '../context/AuthContext';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FILTER_CATEGORIES, SIZES, COLORS } from '../data/constants';
import { db, storage } from '../integrations/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const AddItem = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth(); // ✅ use "user" instead of "currentUser"

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

  if (!isAuthenticated || !user) {
    toast({
      title: "Authentication required",
      description: "Please log in to add items.",
      variant: "destructive"
    });
    return <Navigate to="/login" />;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      toast({
        title: "Image required",
        description: "Please upload an image.",
        variant: "destructive"
      });
      return;
    }

    try {
      const imageRef = ref(storage, `products/${Date.now()}_${user.id}`);
      await uploadString(imageRef, image, 'data_url');
      const downloadURL = await getDownloadURL(imageRef);

      const itemData = {
        ...formData,
        price: parseFloat(formData.price),
        userId: user.id,
        createdAt: serverTimestamp(),
        isSold: false,
        images: [downloadURL]
      };

      await addDoc(collection(db, 'products'), itemData);

      toast({
        title: "Item listed!",
        description: "Your item has been added successfully.",
      });

      navigate('/');
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to upload item. Try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="animate-slide-in py-10">
      <div className="bg-oldie-gray py-6 mb-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-playfair font-bold text-white text-center">Add Your Items For Sale</h1>
        </div>
      </div>
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Label className="block text-xl mb-2">Add Item Image</Label>
            <div 
              className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 cursor-pointer shadow-md hover:shadow-lg transition-shadow" 
              onClick={() => document.getElementById('itemImage')?.click()}
            >
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
                required
              />
            </div>
          </div>

          {/* Category & Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="category">Category *</Label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full glass-input text-base py-2"
                required
              >
                <option value="">Select a category</option>
                {Object.entries(FILTER_CATEGORIES).map(([cat, items]) => (
                  <optgroup key={cat} label={cat}>
                    {items.map(item => <option key={item} value={item}>{item}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="glass-input"
                required
              />
            </div>
          </div>

          {/* Color & Brand */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="color">Color *</Label>
              <Input
                id="color"
                type="text"
                name="color"
                value={formData.color}
                onChange={handleInputChange}
                className="glass-input"
                list="colorOptions"
                required
              />
              <datalist id="colorOptions">
                {COLORS.map(color => <option key={color} value={color} />)}
              </datalist>
            </div>
            <div>
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                className="glass-input"
              />
            </div>
          </div>

          {/* Size & Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <Label htmlFor="size">Size *</Label>
              <Input
                id="size"
                type="text"
                name="size"
                value={formData.size}
                onChange={handleInputChange}
                className="glass-input"
                list="sizeOptions"
                required
              />
              <datalist id="sizeOptions">
                {SIZES.map(size => <option key={size} value={size} />)}
              </datalist>
            </div>
            <div>
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="glass-input"
                required
              />
            </div>
          </div>

          {/* FIB ID */}
          <div className="mb-6">
            <Label htmlFor="fibId">FIB ID *</Label>
            <Input
              id="fibId"
              type="text"
              name="fibId"
              value={formData.fibId}
              onChange={handleInputChange}
              className="glass-input"
              required
            />
          </div>

          {/* Description */}
          <div className="mb-8">
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="glass-input min-h-[150px] w-full"
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
