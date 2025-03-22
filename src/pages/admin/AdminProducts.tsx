
import { useState } from "react";
import { products } from "../../data/products";
import { Button } from "@/components/ui/button";
import { PencilIcon, Trash2Icon, PlusIcon } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const AdminProducts = () => {
  const [productsList, setProductsList] = useState(products);

  const handleDeleteProduct = (id: string) => {
    // In a real app, you would call an API to delete the product
    setProductsList(productsList.filter(product => product.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been successfully deleted."
    });
  };
  
  const handleEditProduct = (id: string) => {
    toast({
      title: "Edit product",
      description: "Edit functionality would be implemented here."
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-playfair font-bold">Products Management</h1>
        <Button className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Add New Product
        </Button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {productsList.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="w-12 h-12 rounded-md overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{product.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{product.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditProduct(product.id)}>
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteProduct(product.id)}>
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;
