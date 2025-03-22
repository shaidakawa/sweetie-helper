
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryCard from '../components/CategoryCard';

const categories = [
  {
    id: '1',
    title: 'Accessories',
    image: '/lovable-uploads/197998cf-409e-4bc4-b4a8-44efbd64db4a.png',
    link: '/categories/accessories'
  },
  {
    id: '2',
    title: 'Dress',
    image: '/lovable-uploads/35f2fd4f-a2aa-4fe4-95a8-fe165c7ac7df.png',
    link: '/categories/dress'
  },
  {
    id: '3',
    title: 'Kurdish Dresses',
    image: '/lovable-uploads/1db5a679-eae7-4639-abcf-dbe2bbe81c15.png',
    link: '/categories/kurdish-dresses'
  },
  {
    id: '4',
    title: 'Shoes',
    image: '/lovable-uploads/4fba6377-92cb-4d75-aef5-f835ee67b750.png',
    link: '/categories/shoes'
  },
  {
    id: '5',
    title: 'Bags',
    image: '/lovable-uploads/209ed3f3-b251-45fe-af6f-cbbac1f1ccf3.png',
    link: '/categories/bags'
  },
  {
    id: '6',
    title: 'Tops',
    image: '/lovable-uploads/f8e6b2b4-ec0a-4670-91fe-0993320cc78b.png',
    link: '/categories/tops'
  },
  {
    id: '7',
    title: 'Trousers',
    image: '/lovable-uploads/14135fb0-35e2-4127-9013-74bd241d6182.png',
    link: '/categories/trousers'
  },
  {
    id: '8',
    title: 'Jackets',
    image: '/lovable-uploads/6db6afbc-70d9-40b6-84cd-96e02122b8c5.png',
    link: '/categories/jackets'
  }
];

const Categories = () => {
  return (
    <div className="animate-slide-in py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-playfair font-bold mb-12 mt-8">Categories</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-white/70 backdrop-blur-sm">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="clothing">Clothing</TabsTrigger>
              <TabsTrigger value="accessories">Accessories</TabsTrigger>
              <TabsTrigger value="kurdish">Kurdish</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories.map(category => (
                <CategoryCard 
                  key={category.id}
                  title={category.title}
                  image={category.image}
                  link={category.link}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="clothing" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories
                .filter(c => ['Dress', 'Tops', 'Trousers', 'Jackets'].includes(c.title))
                .map(category => (
                  <CategoryCard 
                    key={category.id}
                    title={category.title}
                    image={category.image}
                    link={category.link}
                  />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="accessories" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories
                .filter(c => ['Accessories', 'Shoes', 'Bags'].includes(c.title))
                .map(category => (
                  <CategoryCard 
                    key={category.id}
                    title={category.title}
                    image={category.image}
                    link={category.link}
                  />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="kurdish" className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categories
                .filter(c => c.title.includes('Kurdish'))
                .map(category => (
                  <CategoryCard 
                    key={category.id}
                    title={category.title}
                    image={category.image}
                    link={category.link}
                  />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-center mt-12">
          <Link to="/all-items" className="btn-black">
            View All Items
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
