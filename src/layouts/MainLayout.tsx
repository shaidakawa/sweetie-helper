
import { Outlet } from 'react-router-dom';
import CustomNavbar from '../components/CustomNavbar';
import CustomFooter from '../components/CustomFooter';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-300">
      <CustomNavbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <CustomFooter />
    </div>
  );
};

export default MainLayout;
