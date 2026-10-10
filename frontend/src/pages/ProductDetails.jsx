import React, { useEffect, useState } from 'react';
import { Star, Truck, ShieldCheck, ShoppingCart, Minus, Plus } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiUrl } from '../config/api';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  // Get logged in user
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem('userInfo'));
  } catch {
    user = null;
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(apiUrl(`/api/products/${id}`));
        if (res.ok) {
          const data = await res.json();
          setProduct(data && data._id ? data : null);
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error("Failed to load product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    // 1. Get existing cart
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    // 2. Check if item already exists
    const existingItem = cart.find(x => x.product === product._id);
    
    if (existingItem) {
      alert("Item already in cart!");
      navigate('/cart');
      return;
    }

    // 3. Add new item
    const cartItem = {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      farmer: product.farmer,
      qty: qty
    };

    cart.push(cartItem);
    localStorage.setItem('cartItems', JSON.stringify(cart));

    // 4. Feedback
    if(window.confirm("Item added to Cart! Go to Cart now?")) {
        navigate('/cart');
    }
  };

  if (loading) return <div className="pt-24 text-center">Loading Product...</div>;
  if (!product) return <div className="pt-24 text-center">Product Not Found</div>;

  const isOwner = Boolean(user?.name && product?.farmer && user.name.trim().toLowerCase() === product.farmer.trim().toLowerCase());

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto bg-white rounded-[2.5rem] p-6 md:p-12 shadow-xl border border-gray-100 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* IMAGE */}
        <div className="space-y-4">
          <div className="h-[400px] rounded-3xl overflow-hidden bg-gray-100 border border-gray-200">
            <img src={product.image} className="w-full h-full object-cover" alt={product.name} onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?q=80&w=1000&auto=format&fit=crop"; }} />
          </div>
        </div>

        {/* DETAILS */}
        <div>
           <div className="flex items-center gap-2 mb-4">
              <span className="bg-green-100 text-[#15803d] px-3 py-1 rounded-full text-xs font-bold uppercase">In Stock</span>
              <span className="flex items-center gap-1 text-yellow-500 font-bold text-sm"><Star className="w-4 h-4 fill-yellow-500" /> {product.rating || 4.5}</span>
           </div>

           <h1 className="text-3xl md:text-4xl font-extrabold text-[#1a2e05] mb-2">{product.name}</h1>
           <p className="text-gray-500 text-sm mb-6">Sold by <span className="text-[#15803d] font-bold underline decoration-dotted">{product.farmer}</span>, {product.location}</p>

           <div className="flex items-end gap-2 mb-8">
              <span className="text-4xl font-extrabold text-[#15803d]">₹{product.price}</span>
              <span className="text-gray-400 mb-1 text-sm">/ unit</span>
           </div>

           <div className="bg-[#f8fafc] p-6 rounded-2xl border border-gray-100 mb-8">
             <h3 className="font-bold text-[#1a2e05] mb-2">Description</h3>
             <p className="text-gray-500 text-sm leading-relaxed">High quality produce directly from the farm.</p>
             <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="flex items-center gap-2 text-sm text-gray-600"><Truck className="w-4 h-4 text-[#15803d]" /> 2 Days Delivery</div>
                <div className="flex items-center gap-2 text-sm text-gray-600"><ShieldCheck className="w-4 h-4 text-[#15803d]" /> Verified</div>
             </div>
           </div>

           {/* ACTIONS */}
           <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center bg-gray-100 rounded-xl px-4 py-3 gap-6">
                 <button onClick={() => setQty(Math.max(1, qty-1))}><Minus className="w-4 h-4" /></button>
                 <span className="font-bold text-lg w-4 text-center">{qty}</span>
                 <button onClick={() => setQty(qty+1)}><Plus className="w-4 h-4" /></button>
              </div>

              {isOwner ? (
                <button disabled className="flex-1 bg-gray-200 text-gray-400 font-bold py-3.5 rounded-xl cursor-not-allowed">You Own This</button>
              ) : (
                <button onClick={addToCart} className="flex-1 bg-[#15803d] hover:bg-green-700 text-white font-bold py-3.5 rounded-xl shadow-xl transition-all flex items-center justify-center gap-2">
                   <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
              )}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;