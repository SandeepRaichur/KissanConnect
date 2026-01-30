import React, { useEffect, useState } from 'react';
import { Search, Filter, ShoppingCart, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <h1 className="text-3xl font-bold text-[#1a2e05]">Mandi Marketplace</h1>
          <div className="flex gap-2 w-full md:w-auto">
             <div className="flex-1 md:w-80 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex items-center shadow-sm focus-within:border-[#15803d]">
               <Search className="w-5 h-5 text-gray-400 mr-2" />
               <input 
                 type="text" 
                 placeholder="Search crops..." 
                 className="bg-transparent outline-none w-full text-sm font-medium"
                 onChange={(e) => setSearchTerm(e.target.value)} 
               />
             </div>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
          {['All', 'Vegetables', 'Fruits', 'Grains'].map((cat, i) => (
             <button 
               key={i} 
               onClick={() => setCategoryFilter(cat)}
               className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${categoryFilter === cat ? 'bg-[#15803d] text-white' : 'bg-white border border-gray-200 text-gray-600'}`}
             >
               {cat}
             </button>
          ))}
        </div>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all group relative cursor-pointer block">
                <div className="h-52 overflow-hidden relative bg-gray-100">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=1000&auto=format&fit=crop"; }} 
                  />
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1">
                     <MapPin className="w-3 h-3" /> {product.location}
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-1">
                     <h3 className="font-bold text-lg text-[#1a2e05] line-clamp-1">{product.name}</h3>
                     <div className="flex items-center gap-1 bg-yellow-50 px-1.5 py-0.5 rounded text-xs font-bold text-yellow-700 border border-yellow-100">
                       <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /> {product.rating || 4.5}
                     </div>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">{product.farmer}</p>
                  <div className="flex items-center justify-between border-t border-gray-50 pt-3 mt-auto">
                    <div>
                       <p className="text-xs text-gray-400 font-bold uppercase">Price</p>
                       <p className="text-xl font-extrabold text-[#15803d]">₹{product.price}</p>
                    </div>
                    <div className="bg-[#15803d] text-white p-2.5 rounded-xl">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-gray-500">No crops found matching "{searchTerm}"</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Marketplace;