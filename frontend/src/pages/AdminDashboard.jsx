import React, { useEffect, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { apiUrl } from '../config/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ farmerCount: 0, buyerCount: 0, orderCount: 0, totalVolume: 0 });
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const statsRes = await fetch(apiUrl('/api/orders/stats'));
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData && typeof statsData === 'object' ? statsData : { farmerCount: 0, buyerCount: 0, orderCount: 0, totalVolume: 0 });
      }

      const usersRes = await fetch(apiUrl('/api/users'));
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(Array.isArray(usersData) ? usersData : []);
      }

      const productsRes = await fetch(apiUrl('/api/products'));
      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(Array.isArray(productsData) ? productsData : []);
      }
    } catch (error) { 
      console.error("Error fetching admin data:", error); 
    }
  };

  useEffect(() => { 
    fetchData(); 
  }, []);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(apiUrl(`/api/users/${id}`), { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await fetch(apiUrl(`/api/products/${id}`), { method: 'DELETE' });
      fetchData();
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8"><h1 className="text-3xl font-bold text-[#1a2e05]">Admin Panel</h1></div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-[#1a2e05] text-white p-6 rounded-2xl shadow-lg"><h3 className="text-3xl font-bold">{stats?.farmerCount || 0}</h3><p className="text-green-200 text-sm">Total Farmers</p></div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"><h3 className="text-3xl font-bold text-[#1a2e05]">{stats?.buyerCount || 0}</h3><p className="text-gray-500 text-sm">Active Buyers</p></div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"><h3 className="text-3xl font-bold text-[#15803d]">{stats?.orderCount || 0}</h3><p className="text-gray-500 text-sm">Total Orders</p></div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm"><h3 className="text-3xl font-bold text-orange-500">₹{(stats?.totalVolume || 0).toLocaleString()}</h3><p className="text-gray-500 text-sm">Volume</p></div>
        </div>

        {/* USERS TABLE */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10">
          <div className="p-6 border-b border-gray-100"><h3 className="font-bold text-lg text-[#1a2e05]">User Management</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50"><tr><th className="p-4 text-xs font-bold text-gray-500">Name</th><th className="p-4 text-xs font-bold text-gray-500">Role</th><th className="p-4 text-xs font-bold text-gray-500">Action</th></tr></thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 font-bold text-gray-700">{user.name}</td>
                    <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>{user.role}</span></td>
                    <td className="p-4">{user.role !== 'admin' && <button onClick={() => handleDeleteUser(user._id)} className="bg-red-50 text-red-600 p-2 rounded-lg"><Trash2 className="w-4 h-4"/></button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* PRODUCTS TABLE */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100"><h3 className="font-bold text-lg text-[#1a2e05]">Product Oversight</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50"><tr><th className="p-4 text-xs font-bold text-gray-500">Product</th><th className="p-4 text-xs font-bold text-gray-500">Farmer</th><th className="p-4 text-xs font-bold text-gray-500">Price</th><th className="p-4 text-xs font-bold text-gray-500">Action</th></tr></thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="p-4 font-bold text-gray-700">{product.name}</td>
                    <td className="p-4 text-gray-500">{product.farmer}</td>
                    <td className="p-4 font-bold text-[#15803d]">₹{product.price}</td>
                    <td className="p-4"><button onClick={() => handleDeleteProduct(product._id)} className="bg-red-50 text-red-600 p-2 rounded-lg"><Trash2 className="w-4 h-4"/></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;