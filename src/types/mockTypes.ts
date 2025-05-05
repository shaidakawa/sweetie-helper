
// Mock types to replace Supabase database types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'user' | 'admin';
}

export interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  category: string;
  brand?: string;
  color?: string;
  size?: string;
  location: string;
  images: string[];
  is_sold: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  product_id: string;
  seller_id: string;
  buyer_id: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

export interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  avatar_url?: string;
  location?: string;
  created_at: string;
  updated_at: string;
}
