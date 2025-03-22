
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="animate-slide-in">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:pr-12 mb-10 md:mb-0">
              <h1 className="text-5xl font-playfair font-bold mb-8">About</h1>
              
              <p className="text-lg italic mb-6">
                At Oldie, We Celebrate Fashion With A Second Life! Discover A Handpicked Collection Of Kurdish Clothes, Kurdish Accessories, Stylish Accessories, Shoes, Bags, And Dresses—All Pre-Loved And Ready To Shine Again.
              </p>
              
              <p className="text-lg italic mb-6">
                We Believe In Sustainable Shopping Without Compromising Style. Whether You're Embracing Tradition Or Refreshing Your Wardrobe, Find Unique Pieces That Tell A Story. Join Us In Making Fashion Timeless!
              </p>
              
              <div className="mt-10">
                <Link to="/categories" className="btn-black">
                  Shop Now
                </Link>
              </div>
            </div>
            
            <div className="w-full md:w-1/2 relative">
              <img 
                src="/lovable-uploads/6db6afbc-70d9-40b6-84cd-96e02122b8c5.png" 
                alt="Clothes rack with garments" 
                className="w-full h-[600px] object-cover rounded-md shadow-md"
              />
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold mb-12 text-center">Our Mission</h2>
          
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xl italic mb-6">
              To create a sustainable fashion ecosystem that extends the lifecycle of quality garments while preserving cultural heritage through Kurdish traditional pieces.
            </p>
            <p className="text-xl italic mb-6">
              We carefully curate each item, ensuring quality and authenticity, while providing a platform for fashionable second-hand clothing to find new homes.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-oldie-lightgray">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-playfair font-bold mb-12 text-center">Why Shop Pre-Loved?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center">
              <h3 className="text-2xl font-medium mb-4">Sustainability</h3>
              <p className="text-lg">By giving clothes a second life, you're reducing waste and your carbon footprint.</p>
            </div>
            
            <div className="glass-card p-8 text-center">
              <h3 className="text-2xl font-medium mb-4">Unique Style</h3>
              <p className="text-lg">Find one-of-a-kind pieces that aren't available in regular stores.</p>
            </div>
            
            <div className="glass-card p-8 text-center">
              <h3 className="text-2xl font-medium mb-4">Value</h3>
              <p className="text-lg">Get high-quality designer and brand items at a fraction of the original price.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
