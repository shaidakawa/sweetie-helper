
export interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  brand?: string;
  color?: string;
  size?: string;
  location?: string;
  date?: string;
}

export interface Category {
  id: string;
  title: string;
  image: string;
  link: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
}
