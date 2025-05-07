
export type User = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: 'user' | 'admin';
  user_metadata?: {
    first_name?: string;
    last_name?: string;
    role?: 'user' | 'admin';
  };
};

export type UserProfile = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
  location: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
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
  userId: string;
  createdAt: string;
  updatedAt: string;
  isSold: boolean;
};

export type Conversation = {
  id: string;
  productId: string;
  sellerId: string;
  buyerId: string;
  createdAt: string;
  updatedAt: string;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
};
