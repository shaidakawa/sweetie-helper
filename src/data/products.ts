
import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    title: 'Zara High heels shoes',
    price: 10.99,
    images: ['/lovable-uploads/14135fb0-35e2-4127-9013-74bd241d6182.png'],
    category: 'Shoes',
    brand: 'Zara',
    color: 'Beige',
    size: '37',
    location: 'Erbil',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSold: false
  },
  {
    id: '2',
    title: 'Adidas Samba sneakers',
    price: 10.99,
    images: ['/lovable-uploads/3517bb27-9d83-40dc-83b5-611afb8a1a41.png'],
    category: 'Shoes',
    brand: 'Adidas',
    color: 'White',
    size: '42',
    location: 'Erbil',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSold: false
  },
  {
    id: '3',
    title: 'Saint Laurent shoes',
    price: 10.99,
    images: ['/lovable-uploads/6db6afbc-70d9-40b6-84cd-96e02122b8c5.png'],
    category: 'Shoes',
    brand: 'Saint Laurent',
    color: 'Black',
    size: '39',
    location: 'Erbil',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSold: false
  },
  {
    id: '4',
    title: 'Zara summer sandals',
    price: 10.99,
    images: ['/lovable-uploads/197998cf-409e-4bc4-b4a8-44efbd64db4a.png'],
    category: 'Shoes',
    brand: 'Zara',
    color: 'Brown',
    size: '38',
    location: 'Erbil',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSold: false
  },
  {
    id: '5',
    title: 'Hermes summer sandals',
    price: 10.99,
    images: ['/lovable-uploads/35f2fd4f-a2aa-4fe4-95a8-fe165c7ac7df.png'],
    category: 'Shoes',
    brand: 'Hermes',
    color: 'Beige',
    size: '38',
    location: 'Erbil',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSold: false
  },
  {
    id: '6',
    title: 'Kurdish Handmade shoes',
    price: 10.99,
    images: ['/lovable-uploads/8a0eda7d-131b-4967-b704-43f6627119b5.png'],
    category: 'Shoes',
    brand: 'Handmade',
    color: 'White',
    size: '39',
    location: 'Erbil',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSold: false
  },
  {
    id: '7',
    title: 'Lancaster Hand Bag',
    price: 10.99,
    images: ['/lovable-uploads/209ed3f3-b251-45fe-af6f-cbbac1f1ccf3.png'],
    category: 'Bags',
    brand: 'Lancaster',
    color: 'Black',
    location: 'Erbil',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSold: false
  },
  {
    id: '8',
    title: 'Kurdish Bride Dress',
    price: 10.99,
    images: ['/lovable-uploads/1db5a679-eae7-4639-abcf-dbe2bbe81c15.png'],
    category: 'Kurdish Dress',
    color: 'Gold',
    size: 'M',
    location: 'Erbil',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSold: false
  },
  {
    id: '9',
    title: 'Rolex Watch',
    price: 10.99,
    images: ['/lovable-uploads/4fba6377-92cb-4d75-aef5-f835ee67b750.png'],
    category: 'Accessories',
    brand: 'Rolex',
    color: 'Gold',
    location: 'Erbil',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSold: false
  },
  {
    id: '10',
    title: 'Zara T-Shirt',
    price: 10.99,
    images: ['/lovable-uploads/f8e6b2b4-ec0a-4670-91fe-0993320cc78b.png'],
    category: 'Top',
    brand: 'Zara',
    color: 'White',
    size: 'M',
    location: 'Erbil',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSold: false
  },
  {
    id: '11',
    title: 'Kurdish Dress Belt',
    price: 10.99,
    images: ['/lovable-uploads/4fba6377-92cb-4d75-aef5-f835ee67b750.png'],
    category: 'Accessories',
    color: 'Gold',
    location: 'Erbil',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSold: false
  },
  {
    id: '12',
    title: 'Kurdish Dress Cap',
    price: 10.99,
    images: ['/lovable-uploads/8a0eda7d-131b-4967-b704-43f6627119b5.png'],
    category: 'Accessories',
    color: 'Gold',
    location: 'Erbil',
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    isSold: false
  }
];

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getRelatedProducts = (productId: string, category: string, limit = 6): Product[] => {
  return products
    .filter(product => 
      product.id !== productId && 
      product.category.toLowerCase() === category.toLowerCase()
    )
    .slice(0, limit);
};
