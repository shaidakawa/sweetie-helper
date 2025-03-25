
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="animate-slide-in bg-gray-300 min-h-screen">
      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 pr-0 md:pr-10 mb-10 md:mb-0">
              <h1 className="text-5xl font-playfair font-bold mb-8">About</h1>
              
              <p className="text-lg italic mb-6">
                At Oldie, We Celebrate Fashion With A Second Life! Discover A Handpicked Collection Of Kurdish Clothes, Kurdish Accessories, Stylish Accessories, Shoes, Bags, And Dresses—All Pre-Loved And Ready To Shine Again.
              </p>
              
              <p className="text-lg italic mb-6">
                We Believe In Sustainable Shopping Without Compromising Style. Whether You're Embracing Tradition Or Refreshing Your Wardrobe, Find Unique Pieces That Tell A Story. Join Us In Making Fashion Timeless!
              </p>
              
              <div className="mt-20">
                <Link to="/categories" className="btn-black py-2 px-8 bg-black text-white rounded-sm hover:bg-gray-800 transition-colors">
                  Shop Now
                </Link>
              </div>
            </div>
            
            <div className="w-full md:w-1/2">
              <img 
                src="/lovable-uploads/50ac75b1-383d-40ee-a46b-f2b9179d8d71.png" 
                alt="Clothes rack with garments" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
