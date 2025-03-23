
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center">
      <div className="glass-card p-12 text-center max-w-md shadow-lg">
        <h1 className="text-7xl font-playfair font-bold mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8 font-cormorant">
          Oops! Page not found
        </p>
        <Link to="/" className="btn-black py-3 px-8 shadow-md inline-block">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
