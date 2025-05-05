import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryCard from '../components/CategoryCard';

const categories = [
  {
    id: '1',
    title: 'Accessories',
    image: '/placeholder.svg',
    link: '/categories/accessories'
  },
  {
    id: '2',
    title: 'Dress',
    image: '/placeholder.svg',
    link: '/categories/dress'
  },
  {
    id: '3',
    title: 'Kurdish Dresses',
    image: '/placeholder.svg',
    link: '/categories/kurdish-dresses'
  },
  {
    id: '4',
    title: 'Shoes',
    image: '/placeholder.svg',
    link: '/categories/shoes'
  },
  {
    id: '5',
    title: 'Bags',
    image: '/placeholder.svg',
    link: '/categories/bags'
  },
  {
    id: '6',
    title: 'Tops',
    image: '/lovable-uploads/ca5118df-1cd3-497b-92b2-4049d3193f47.png',
    link: '/categories/tops'
  },
  {
    id: '7',
    title: 'Trousers',
    image: '/placeholder.svg',
    link: '/categories/trousers'
  },
  {
    id: '8',
    title: 'Jackets',
    image: '/placeholder.svg',
    link: '/categories/jackets'
  }
];

const Categories = () => {
  return (
    <div className="animate-slide-in py-10"
      style={{
        background: "radial-gradient(100.93% 55.95% at 50.02% 44.05%, rgba(201, 201, 199, 0.3) 0%, rgba(99, 99, 98, 0.5) 100%)"
      }}
    >
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-playfair font-bold mb-12 mt-8">Categories</h1>
        
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-transparent backdrop-blur-sm shadow-[0_5px_15px_rgba(0,0,0,0.2)] rounded-md">
              <TabsTrigger value="all" className="data-[state=active]:bg-white/50">All</TabsTrigger>
              <TabsTrigger value="clothing" className="data-[state=active]:bg-white/50">Clothing</TabsTrigger>
              <TabsTrigger value="accessories" className="data-[state=active]:bg-white/50">Accessories</TabsTrigger>
              <TabsTrigger value="kurdish" className="data-[state=active]:bg-white/50">Kurdish</TabsTrigger>
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
