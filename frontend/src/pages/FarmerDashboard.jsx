import React, { useState, useEffect } from 'react';
import { Plus, Package, DollarSign, X, Save, Trash2, ChevronDown } from 'lucide-react';

const FarmerDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [orders, setOrders] = useState([]);
  const [myCrops, setMyCrops] = useState([]);
  const [stats, setStats] = useState({ earnings: 0, orders: 0 });

  const user = JSON.parse(localStorage.getItem('userInfo')) || { name: 'Farmer' };

  const [formData, setFormData] = useState({
    name: '', 
    price: '', 
    category: 'Vegetables', 
    location: 'Karnataka',
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=400'
  });

  // 1. Fetch Data
  const fetchData = async () => {
    try {
      const orderRes = await fetch(`http://localhost:5000/api/orders/myorders?farmer=${user.name}`);
      const orderData = await orderRes.json();
      setOrders(orderData);
      
      const totalEarnings = orderData.reduce((acc, order) => acc + order.price, 0);
      setStats({ earnings: totalEarnings, orders: orderData.length });

      const productRes = await fetch('http://localhost:5000/api/products');
      const productData = await productRes.json();
      const myProducts = productData.filter(p => p.farmer === user.name);
      setMyCrops(myProducts);

    } catch (error) { console.error("Error fetching data"); }
  };

  useEffect(() => { fetchData(); }, [user.name]);

  // 2. Handle Add Crop
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, farmer: user.name, rating: 0 }),
      });
      if (response.ok) {
        alert('Crop Added Successfully!');
        setShowForm(false);
        fetchData();
      }
    } catch (error) { alert('Server Error'); }
  };

  // 3. Handle Delete Crop
  const handleDeleteCrop = async (id) => {
    if(!window.confirm("Are you sure you want to delete this crop?")) return;
    try {
        await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
        fetchData();
    } catch (error) { alert("Delete failed"); }
  };

  // 4. Handle Update Status (FIXED FOR INSTANT UPDATE)
  const handleStatusChange = async (id, newStatus) => {
    // A. Optimistic Update: Update UI Immediately
    const updatedOrders = orders.map(order => 
        order._id === id ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders); // Screen updates instantly

    // B. Send to Backend in Background
    try {
        const res = await fetch(`http://localhost:5000/api/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });
        
        if(!res.ok) {
            alert("Failed to save status on server");
            fetchData(); // Revert if server failed
        }
    } catch (error) { 
        alert("Update failed"); 
        fetchData(); // Revert if error
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div><h1 className="text-3xl font-bold text-[#1a2e05]">Farmer Dashboard</h1><p>Welcome, {user.name}</p></div>
          <button onClick={() => setShowForm(true)} className="bg-[#15803d] text-white px-6 py-3 rounded-xl font-bold flex gap-2 shadow-lg"><Plus /> Add New Crop</button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-full flex justify-center items-center bg-green-600 text-white"><DollarSign /></div>
              <div><p className="text-gray-500 text-sm">Total Earnings</p><h3 className="text-2xl font-bold">₹ {stats.earnings}</h3></div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 rounded-full flex justify-center items-center bg-blue-500 text-white"><Package /></div>
              <div><p className="text-gray-500 text-sm">Total Orders</p><h3 className="text-2xl font-bold">{stats.orders}</h3></div>
          </div>
        </div>

        {/* SECTION 1: MY ACTIVE LISTINGS */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
          <h3 className="font-bold text-lg p-6 border-b border-gray-100 text-[#1a2e05]">My Active Crops</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr><th className="p-4 text-xs font-bold text-gray-500">Crop Name</th><th className="p-4 text-xs font-bold text-gray-500">Category</th><th className="p-4 text-xs font-bold text-gray-500">Price</th><th className="p-4 text-xs font-bold text-gray-500">Action</th></tr>
              </thead>
              <tbody>
                {myCrops.length > 0 ? myCrops.map((crop) => (
                  <tr key={crop._id} className="border-b border-gray-50">
                    <td className="p-4 font-bold">{crop.name}</td>
                    <td className="p-4 text-sm text-gray-500">{crop.category}</td>
                    <td className="p-4">₹{crop.price}</td>
                    <td className="p-4">
                        <button onClick={() => handleDeleteCrop(crop._id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                    </td>
                  </tr>
                )) : <tr><td colSpan="4" className="p-6 text-center text-gray-500">You haven't listed any crops yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* SECTION 2: RECENT ORDERS (Status Update Fixed) */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <h3 className="font-bold text-lg p-6 border-b border-gray-100 text-[#1a2e05]">Recent Orders</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50">
                <tr><th className="p-4 text-xs font-bold text-gray-500">Item</th><th className="p-4 text-xs font-bold text-gray-500">Qty</th><th className="p-4 text-xs font-bold text-gray-500">Buyer</th><th className="p-4 text-xs font-bold text-gray-500">Payment</th><th className="p-4 text-xs font-bold text-gray-500">Status</th><th className="p-4 text-xs font-bold text-gray-500">Price</th></tr>
              </thead>
              <tbody>
                {orders.length > 0 ? orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-50">
                    <td className="p-4 font-bold text-[#15803d]">{order.product}</td>
                    <td className="p-4 text-sm">{order.quantity}</td>
                    <td className="p-4 text-sm">{order.buyer}</td>
                    <td className="p-4"><span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs border border-gray-200">{order.paymentMethod || "COD"}</span></td>
                    <td className="p-4">
                        {/* SELECT DROPDOWN */}
                        <div className="relative inline-block w-full">
                          <select 
                              value={order.status} 
                              onChange={(e) => handleStatusChange(order._id, e.target.value)}
                              className={`appearance-none w-full px-3 py-1 pr-8 rounded-full text-xs font-bold border-none outline-none cursor-pointer transition-colors
                                ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 
                                  order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}
                          >
                              <option value="Pending">Pending</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                          </select>
                          {/* Custom Arrow to make it look nice */}
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                            <ChevronDown className="w-3 h-3" />
                          </div>
                        </div>
                    </td>
                    <td className="p-4 font-bold">₹{order.price}</td>
                  </tr>
                )) : <tr><td colSpan="6" className="p-6 text-center text-gray-500">No orders yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
             <div className="bg-white rounded-3xl p-8 w-full max-w-lg relative shadow-2xl animate-fade-in">
                <button onClick={() => setShowForm(false)} className="absolute top-4 right-4"><X /></button>
                <h2 className="text-2xl font-bold mb-6 text-[#1a2e05]">List New Crop</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                   <div>
                     <label className="text-sm font-bold text-gray-700 ml-1">Crop Name</label>
                     <input name="name" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-[#15803d]" placeholder="e.g. Potato" required />
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="text-sm font-bold text-gray-700 ml-1">Price (₹)</label>
                       <input name="price" type="number" min="1" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-[#15803d]" placeholder="50" required />
                     </div>
                     <div>
                       <label className="text-sm font-bold text-gray-700 ml-1">Category</label>
                       <div className="relative">
                         <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-[#15803d] appearance-none cursor-pointer">
                           <option value="Vegetables">Vegetables</option>
                           <option value="Fruits">Fruits</option>
                           <option value="Grains">Grains</option>
                           <option value="Commercial">Commercial</option>
                         </select>
                         <div className="absolute right-3 top-3.5 pointer-events-none text-gray-500"><ChevronDown className="w-4 h-4" /></div>
                       </div>
                     </div>
                   </div>
                   <div>
                     <label className="text-sm font-bold text-gray-700 ml-1">Location</label>
                     <input name="location" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-[#15803d]" placeholder="e.g. Nashik" required />
                   </div>
                   <div>
                     <label className="text-sm font-bold text-gray-700 ml-1">Image URL</label>
                     <input name="image" onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 outline-none focus:border-[#15803d]" placeholder="Paste image link" />
                   </div>
                   <button className="w-full bg-[#15803d] text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg">Publish Listing</button>
                </form>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default FarmerDashboard;