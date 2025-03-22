
import { Card } from "@/components/ui/card";
import { useAuth } from "../../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-playfair font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 shadow-md">
          <h3 className="text-lg font-medium mb-2">Total Products</h3>
          <p className="text-4xl font-bold">126</p>
        </Card>
        
        <Card className="p-6 shadow-md">
          <h3 className="text-lg font-medium mb-2">Active Users</h3>
          <p className="text-4xl font-bold">453</p>
        </Card>
        
        <Card className="p-6 shadow-md">
          <h3 className="text-lg font-medium mb-2">Total Sales</h3>
          <p className="text-4xl font-bold">$28,459</p>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 shadow-md">
          <h3 className="text-lg font-medium mb-4">Recent Activities</h3>
          <div className="space-y-3">
            <div className="pb-3 border-b">
              <p className="text-sm text-gray-500">Today, 10:30 AM</p>
              <p>New product added: Vintage Leather Jacket</p>
            </div>
            <div className="pb-3 border-b">
              <p className="text-sm text-gray-500">Yesterday, 3:45 PM</p>
              <p>User Sara Wilson made a purchase</p>
            </div>
            <div className="pb-3 border-b">
              <p className="text-sm text-gray-500">Yesterday, 11:15 AM</p>
              <p>5 new users registered</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 shadow-md">
          <h3 className="text-lg font-medium mb-4">Quick Stats</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>Product Views</span>
                <span>78%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-oldie-gray h-2 rounded-full" style={{ width: "78%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span>Conversion Rate</span>
                <span>25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-oldie-gray h-2 rounded-full" style={{ width: "25%" }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span>Return Rate</span>
                <span>5%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-oldie-gray h-2 rounded-full" style={{ width: "5%" }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
