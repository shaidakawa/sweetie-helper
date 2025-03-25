
// Products data
export const products = [
  {
    id: "1",
    title: "Vintage Leather Boots",
    price: 120.00,
    image: "/lovable-uploads/14135fb0-35e2-4127-9013-74bd241d6182.png",
    category: "High Heels",
    brand: "Vintage Collection",
    description: "Classic leather boots with timeless design. Perfect for any occasion."
  },
  {
    id: "2",
    title: "1970s Floral Dress",
    price: 85.00,
    image: "/lovable-uploads/4fba6377-92cb-4d75-aef5-f835ee67b750.png",
    category: "Dresses",
    brand: "RetroChic",
    description: "Beautiful floral pattern dress from the 70s. Well preserved and elegant."
  },
  {
    id: "3",
    title: "Designer Tote Bag",
    price: 95.00,
    image: "/lovable-uploads/8a0eda7d-131b-4967-b704-43f6627119b5.png", 
    category: "Bags",
    brand: "Luxury Vintage",
    description: "Spacious tote bag in excellent condition. Stylish and practical."
  },
  {
    id: "4",
    title: "Vintage Gold Earrings",
    price: 65.00,
    image: "/lovable-uploads/6db6afbc-70d9-40b6-84cd-96e02122b8c5.png",
    category: "Jewelry",
    brand: "Golden Age",
    description: "Elegant gold earrings with intricate design. A timeless accessory."
  },
  {
    id: "5",
    title: "Classic Denim Jacket",
    price: 75.00,
    image: "/lovable-uploads/50ac75b1-383d-40ee-a46b-f2b9179d8d71.png",
    category: "Jackets",
    brand: "Retro Denim",
    description: "Well-loved denim jacket with perfect fading. A wardrobe essential."
  },
  {
    id: "6",
    title: "Silk Scarf Collection",
    price: 45.00,
    image: "/lovable-uploads/4fba6377-92cb-4d75-aef5-f835ee67b750.png",
    category: "Accessories",
    brand: "Silk Heritage",
    description: "Set of three vintage silk scarves in vibrant patterns."
  },
  {
    id: "7",
    title: "Zara High heels shoes",
    price: 10.99,
    image: "/lovable-uploads/08e778bf-4ec8-4d76-b502-2c5a8cd34813.png",
    category: "Shoes",
    brand: "Zara",
    description: "Elegant high heel shoes in excellent condition."
  },
  {
    id: "8",
    title: "Adidas Samba sneakers",
    price: 10.99,
    image: "/lovable-uploads/d0eca0ac-b671-433f-a088-a643c37ff819.png",
    category: "Shoes",
    brand: "Adidas",
    description: "Classic Adidas Samba sneakers in great condition."
  },
  {
    id: "9",
    title: "Saint Laurent shoes",
    price: 10.99,
    image: "/lovable-uploads/6db6afbc-70d9-40b6-84cd-96e02122b8c5.png",
    category: "Shoes",
    brand: "Saint Laurent",
    description: "Luxury Saint Laurent shoes, barely worn."
  },
  {
    id: "10",
    title: "Zara summer sandals",
    price: 10.99,
    image: "/lovable-uploads/08e778bf-4ec8-4d76-b502-2c5a8cd34813.png",
    category: "Shoes",
    brand: "Zara",
    description: "Comfortable summer sandals in good condition."
  },
  {
    id: "11",
    title: "Hermes summer sandals",
    price: 10.99,
    image: "/lovable-uploads/d0eca0ac-b671-433f-a088-a643c37ff819.png",
    category: "Shoes",
    brand: "Hermes",
    description: "Luxury Hermes sandals, perfect for summer."
  },
  {
    id: "12",
    title: "Kurdish Handmade shoes",
    price: 10.99,
    image: "/lovable-uploads/6db6afbc-70d9-40b6-84cd-96e02122b8c5.png",
    category: "Shoes",
    brand: "Handmade",
    description: "Traditional Kurdish handmade shoes with unique designs."
  }
];

// Categories data
export const categories = [
  {
    id: "1",
    name: "Accessories",
    image: "/lovable-uploads/08e778bf-4ec8-4d76-b502-2c5a8cd34813.png",
    description: "Vintage accessories, jewelry, and more"
  },
  {
    id: "2",
    name: "Dress",
    image: "/lovable-uploads/d0eca0ac-b671-433f-a088-a643c37ff819.png",
    description: "Classic and elegant dresses"
  },
  {
    id: "3",
    name: "Kurdish Dresses",
    image: "/lovable-uploads/6db6afbc-70d9-40b6-84cd-96e02122b8c5.png",
    description: "Traditional Kurdish dresses and attire"
  },
  {
    id: "4",
    name: "Shoes",
    image: "/lovable-uploads/08e778bf-4ec8-4d76-b502-2c5a8cd34813.png",
    description: "Vintage shoes, boots, and more"
  },
  {
    id: "5",
    name: "Bags",
    image: "/lovable-uploads/50ac75b1-383d-40ee-a46b-f2b9179d8d71.png",
    description: "Preloved purses and handbags"
  },
  {
    id: "6",
    name: "Tops",
    image: "/lovable-uploads/4fba6377-92cb-4d75-aef5-f835ee67b750.png",
    description: "Vintage tops and blouses"
  },
  {
    id: "7",
    name: "Trousers",
    image: "/lovable-uploads/50ac75b1-383d-40ee-a46b-f2b9179d8d71.png",
    description: "Preloved trousers and pants"
  },
  {
    id: "8",
    name: "Jackets",
    image: "/lovable-uploads/50ac75b1-383d-40ee-a46b-f2b9179d8d71.png",
    description: "Vintage jackets and coats"
  }
];

// Function to get products by category
export const getProductsByCategory = (categoryName: string) => {
  return products.filter(product => 
    product.category.toLowerCase() === categoryName.toLowerCase().replace(/-/g, ' ')
  );
};

// Function to get related products
export const getRelatedProducts = (productId: string, category: string) => {
  return products
    .filter(product => 
      product.id !== productId && 
      product.category.toLowerCase() === category.toLowerCase()
    )
    .slice(0, 3);
};
