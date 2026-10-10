import React, { useState, useEffect } from 'react';
import { Trash2, Smartphone, CreditCard, Banknote, X, Loader, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { apiUrl } from '../config/api';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Card'); // Default to Card to show the form
  const [isProcessing, setIsProcessing] = useState(false);

  // Fake Form State
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [upiId, setUpiId] = useState('');

  // Load Cart
  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem('cartItems')) || [];
      setCartItems(Array.isArray(items) ? items : []);
    } catch {
      setCartItems([]);
    }
  }, []);

  const removeFromCart = (id) => {
    const newCart = cartItems.filter(item => item.product !== id);
    setCartItems(newCart);
    localStorage.setItem('cartItems', JSON.stringify(newCart));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + (Number(item.price) || 0) * (Number(item.qty) || 1), 0);
  };

  const handleCheckout = () => {
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('userInfo'));
    } catch {
      user = null;
    }
    if (!user) {
      alert("Please Login to Checkout");
      navigate('/login');
      return;
    }
    setShowPayment(true);
  };

  // Payment Confirmation Logic
  const confirmPayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('userInfo'));
    } catch {
      user = null;
    }

    try {
      // Send orders to backend
      for (const item of cartItems) {
        const res = await fetch(apiUrl('/api/orders'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            product: item.name,
            quantity: item.qty,
            price: (Number(item.price) || 0) * (Number(item.qty) || 1),
            buyer: user?.name || 'Customer',
            farmer: item.farmer,
            paymentMethod: paymentMethod // 'Card', 'UPI', or 'COD'
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || 'Failed to record order');
        }
      }

      // Success
      localStorage.removeItem('cartItems');
      setCartItems([]);
      alert(`Payment Successful! Transaction ID: TXN${Math.floor(Math.random() * 10000000)}`);
      setShowPayment(false);
      navigate('/');
    } catch (error) {
      alert(error.message || "Transaction Failed. Please check if backend is running.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-20 px-6 min-h-screen bg-[#f8fafc] text-center">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-[#1a2e05] mb-2">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any fresh produce yet.</p>
        <Link to="/market" className="bg-[#15803d] text-white px-8 py-3 rounded-xl font-bold">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#1a2e05] mb-8">Shopping Cart ({cartItems.length})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* ITEMS LIST */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 shadow-sm">
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-[#1a2e05]">{item.name}</h3>
                  <p className="text-sm text-gray-500">Sold by {item.farmer}</p>
                  <p className="text-[#15803d] font-bold mt-1">₹{item.price} x {item.qty}</p>
                </div>
                <div className="text-right">
                  <p className="font-extrabold text-lg mb-2">₹{item.price * item.qty}</p>
                  <button onClick={() => removeFromCart(item.product)} className="text-red-500 bg-red-50 p-2 rounded-lg hover:bg-red-100">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CHECKOUT SUMMARY */}
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-xl h-fit">
            <h3 className="font-bold text-xl mb-6">Order Summary</h3>
            <div className="flex justify-between mb-4 text-gray-500"><span>Subtotal</span><span>₹{calculateTotal()}</span></div>
            <div className="flex justify-between mb-4 text-gray-500"><span>Delivery Fee</span><span className="text-green-600">Free</span></div>
            <div className="border-t border-gray-100 my-4"></div>
            <div className="flex justify-between mb-8 text-xl font-extrabold text-[#1a2e05]"><span>Total</span><span>₹{calculateTotal()}</span></div>
            
            <button onClick={handleCheckout} className="w-full bg-[#15803d] text-white py-4 rounded-xl font-bold shadow-lg hover:bg-green-700 transition-all">
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>

      {/* === FAKE PAYMENT GATEWAY MODAL === */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-[2rem] p-6 shadow-2xl relative animate-fade-in">
            <button onClick={() => setShowPayment(false)} className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full hover:bg-red-50 hover:text-red-500"><X className="w-5 h-5" /></button>
            
            <div className="flex items-center gap-2 mb-6 text-[#15803d]">
               <ShieldCheck className="w-6 h-6" />
               <h2 className="text-xl font-bold">Secure Payment</h2>
            </div>
            
            {/* Payment Method Tabs */}
            <div className="flex gap-2 mb-6 p-1 bg-gray-100 rounded-xl">
              {['Card', 'UPI', 'COD'].map(method => (
                <button 
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${paymentMethod === method ? 'bg-white text-[#15803d] shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {method}
                </button>
              ))}
            </div>

            {/* PAYMENT FORMS */}
            <form onSubmit={confirmPayment}>
              
              {/* 1. CREDIT CARD FORM */}
              {paymentMethod === 'Card' && (
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Card Number</label>
                    <div className="flex items-center border border-gray-200 rounded-xl px-3 py-3 mt-1 bg-gray-50 focus-within:border-[#15803d] focus-within:bg-white transition-colors">
                       <CreditCard className="w-5 h-5 text-gray-400 mr-2"/>
                       <input 
                         required 
                         type="text" 
                         maxLength="19"
                         placeholder="0000 0000 0000 0000" 
                         className="bg-transparent outline-none w-full font-mono"
                         onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                       />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">Expiry</label>
                      <input required type="text" placeholder="MM/YY" maxLength="5" className="w-full border border-gray-200 rounded-xl p-3 mt-1 bg-gray-50 outline-none focus:border-[#15803d] focus:bg-white" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase ml-1">CVV</label>
                      <input required type="password" placeholder="123" maxLength="3" className="w-full border border-gray-200 rounded-xl p-3 mt-1 bg-gray-50 outline-none focus:border-[#15803d] focus:bg-white" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Card Holder Name</label>
                    <input required type="text" placeholder="e.g. RAJESH KUMAR" className="w-full border border-gray-200 rounded-xl p-3 mt-1 bg-gray-50 outline-none focus:border-[#15803d] focus:bg-white" />
                  </div>
                </div>
              )}

              {/* 2. UPI FORM */}
              {paymentMethod === 'UPI' && (
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100 mb-4">
                    <p className="text-sm text-green-800 font-bold mb-2">Scan QR or Enter UPI ID</p>
                    <div className="w-32 h-32 bg-white mx-auto border-2 border-dashed border-green-300 flex items-center justify-center text-xs text-gray-400">
                      [QR CODE]
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">UPI ID</label>
                    <div className="flex items-center border border-gray-200 rounded-xl px-3 py-3 mt-1 bg-gray-50 focus-within:border-[#15803d] focus-within:bg-white transition-colors">
                       <Smartphone className="w-5 h-5 text-gray-400 mr-2"/>
                       <input 
                         required 
                         type="text" 
                         placeholder="username@okicici" 
                         className="bg-transparent outline-none w-full"
                         onChange={(e) => setUpiId(e.target.value)}
                       />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. COD INFO */}
              {paymentMethod === 'COD' && (
                <div className="text-center p-6 bg-orange-50 rounded-xl border border-orange-100">
                   <Banknote className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                   <h3 className="font-bold text-orange-800">Cash on Delivery</h3>
                   <p className="text-sm text-orange-600 mt-1">Please pay ₹{calculateTotal()} to the delivery agent upon arrival.</p>
                </div>
              )}

              {/* PAY BUTTON */}
              <button 
                type="submit"
                disabled={isProcessing}
                className="w-full bg-[#15803d] text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-green-900/20 hover:bg-green-700 transition-all flex items-center justify-center gap-2 mt-6 disabled:opacity-70"
              >
                {isProcessing ? <><Loader className="w-5 h-5 animate-spin" /> Processing...</> : `Pay ₹${calculateTotal()}`}
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;