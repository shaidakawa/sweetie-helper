import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { products, getRelatedProducts } from '../data/products';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { toast } from '@/components/ui/use-toast';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [purchaseFormVisible, setPurchaseFormVisible] = useState(false);
  const navigate = useNavigate();
  const [purchaseForm, setPurchaseForm] = useState({
    location: '',
    fibId: '',
    phoneNumber: '',
    note: ''
  });
  
  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        
        const related = getRelatedProducts(id, foundProduct.category);
        setRelatedProducts(related);
      }
    }
  }, [id]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPurchaseForm(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleBuyClick = () => {
    setPurchaseFormVisible(true);
  };
  
  const handleMessageClick = () => {
    if (product) {
      navigate('/messages');
      toast({
        title: "Chat initialized!",
        description: `You can now chat with the seller about "${product.title}"`,
      });
    }
  };
  
  const handlePurchaseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Purchase initiated!",
      description: "Your purchase request has been submitted. The seller will contact you soon.",
    });
    setPurchaseFormVisible(false);
  };
  
  if (!product) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-xl">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="animate-slide-in py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12">
          <div className="w-full md:w-1/2">
            <div className="bg-white rounded-lg overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title} 
                className="w-full object-cover"
              />
            </div>
          </div>
          
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl font-playfair font-bold mb-4">{product.title}</h1>
            <p className="text-2xl mb-6">${product.price.toFixed(2)}</p>
            
            <div className="space-y-3 mb-8">
              {product.size && (
                <p><span className="font-medium">Size:</span> {product.size}</p>
              )}
              {product.color && (
                <p><span className="font-medium">Color:</span> {product.color}</p>
              )}
              {product.brand && (
                <p><span className="font-medium">Brand:</span> {product.brand}</p>
              )}
              {product.location && (
                <p><span className="font-medium">Location:</span> {product.location}</p>
              )}
              {product.date && (
                <p><span className="font-medium">Date:</span> {product.date}</p>
              )}
            </div>
            
            {product.description && (
              <div className="mb-8">
                <p className="italic">{product.description}</p>
              </div>
            )}
            
            <div className="flex gap-4">
              <button onClick={handleBuyClick} className="btn-black py-3 px-10">
                Buy
              </button>
              <button 
                onClick={handleMessageClick} 
                className="bg-oldie-gray text-white rounded-full p-3 flex items-center justify-center"
                aria-label="Message seller"
                title="Chat with seller"
              >
                <MessageCircle className="w-6 h-6" />
              </button>
            </div>
            
            {purchaseFormVisible && (
              <form onSubmit={handlePurchaseSubmit} className="space-y-4 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={purchaseForm.location}
                      onChange={handleInputChange}
                      className="glass-input"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-1">FIB ID</label>
                    <input
                      type="text"
                      name="fibId"
                      value={purchaseForm.fibId}
                      onChange={handleInputChange}
                      className="glass-input"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block mb-1">PhoneNumber</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={purchaseForm.phoneNumber}
                    onChange={handleInputChange}
                    className="glass-input"
                    required
                  />
                </div>
                
                <div>
                  <label className="block mb-1">Note</label>
                  <textarea
                    name="note"
                    value={purchaseForm.note}
                    onChange={handleInputChange}
                    className="glass-input min-h-[100px]"
                  />
                </div>
                
                <div className="flex justify-center">
                  <button type="submit" className="btn-black py-3 px-10">
                    Purchase
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl font-playfair font-bold mb-8">Related products</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map(product => (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
