
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { PencilIcon, Trash2Icon, UserPlusIcon } from "lucide-react";

// Mock users data - in a real app, this would come from an API
const mockUsers = [
  { id: "1", email: "john@example.com", firstName: "John", lastName: "Doe", role: "user" },
  { id: "2", email: "jane@example.com", firstName: "Jane", lastName: "Smith", role: "user" },
  { id: "3", email: "mike@example.com", firstName: "Mike", lastName: "Johnson", role: "user" },
  { id: "4", email: "admin@oldie.com", firstName: "Admin", lastName: "Account", role: "admin" },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(mockUsers);

  const handleDeleteUser = (id: string) => {
    // In a real app, you would call an API to delete the user
    setUsers(users.filter(user => user.id !== id));
    toast({
      title: "User deleted",
      description: "The user has been successfully deleted."
    });
  };
  
  const handleEditUser = (id: string) => {
    toast({
      title: "Edit user",
      description: "Edit functionality would be implemented here."
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-playfair font-bold">Users Management</h1>
        <Button className="flex items-center gap-2">
          <UserPlusIcon className="h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleEditUser(user.id)}>
                    <PencilIcon className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleDeleteUser(user.id)} disabled={user.role === 'admin'}>
                    <Trash2Icon className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
