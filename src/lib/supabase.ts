
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { v4 as uuidv4 } from 'uuid';

// Product Operations
export const createProduct = async (productData: {
  title: string;
  description?: string;
  price: number;
  category: string;
  brand?: string;
  color?: string;
  size?: string;
  location: string;
  images: string[];
}) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .insert({
        ...productData,
        user_id: (await supabase.auth.getUser()).data.user?.id
      })
      .select()
      .single();

    if (error) throw error;
    
    toast({
      title: "Product Created",
      description: "Your product has been successfully listed."
    });

    return data;
  } catch (error) {
    toast({
      title: "Error",
      description: error instanceof Error ? error.message : "Failed to create product",
      variant: "destructive"
    });
    throw error;
  }
};

// Image Upload
export const uploadProductImage = async (file: File) => {
  try {
    if (!file) throw new Error('No file selected');

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const fileExt = file.name.split('.').pop();
    const fileName = `${uuidv4()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    const { data, error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl } } = supabase.storage
      .from('product-images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    toast({
      title: "Upload Failed",
      description: error instanceof Error ? error.message : "Image upload failed",
      variant: "destructive"
    });
    throw error;
  }
};

// Fetch Products
export const fetchProducts = async () => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to fetch products",
      variant: "destructive"
    });
    throw error;
  }
};

// Create Conversation
export const startConversation = async (productId: string, sellerId: string) => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        product_id: productId,
        seller_id: sellerId,
        buyer_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to start conversation",
      variant: "destructive"
    });
    throw error;
  }
};

// Send Message
export const sendMessage = async (conversationId: string, content: string) => {
  try {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) throw new Error('User not authenticated');

    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: user.id,
        content
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to send message",
      variant: "destructive"
    });
    throw error;
  }
};
