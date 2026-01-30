import React, { useState, useEffect } from 'react';
import { Phone, User, Menu, X, ShoppingBag, LogOut, ShoppingCart } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check login status whenever the page changes
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    setUser(userInfo);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('cartItems'); // Optional: Clear cart on logout
    setUser(null);
    alert("Logged out successfully");
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* === BRAND LOGO === */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#15803d] rounded-xl flex items-center justify-center text-white shadow-lg shadow-green-600/20 group-hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12.378 1.602a.75.75 0 00-.756 0C5.132 5.381 1.5 10.364 1.5 16.5c0 3.766 2.806 6.88 6.55 7.422a.75.75 0 00.597-.197c2.31-2.26 5.234-2.887 8.166-1.583a.75.75 0 001.034-.94C16.508 17.5 14.5 13.5 14.5 9c0-2.835 1.488-5.322 3.82-7.068a.75.75 0 00.058-1.229 14.974 14.974 0 00-6-.703z" />
            </svg>
          </div>
          <span className="text-xl font-extrabold text-[#15803d] tracking-tight">KissanConnect</span>
        </Link>

        {/* === DESKTOP LINKS === */}
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-600">
          <Link to="/" className="hover:text-[#15803d] hover:font-bold transition-all">Home</Link>
          
          {/* LOGIC FIX: Show Dashboard ONLY if Farmer or Admin */}
          {user && (user.role === 'admin' || user.role === 'farmer') && (
            <Link 
              to={user.role === 'admin' ? "/dashboard/admin" : "/dashboard/farmer"} 
              className="text-[#15803d] font-bold border-b-2 border-[#15803d]"
            >
              Dashboard
            </Link>
          )}

          <Link to="/features" className="hover:text-[#15803d] hover:font-bold transition-all">Features</Link>
          <Link to="/about" className="hover:text-[#15803d] hover:font-bold transition-all">Mission</Link>
          <Link to="/contact" className="hover:text-[#15803d] hover:font-bold transition-all">Contact</Link>
          <Link to="/market" className="flex items-center gap-1 hover:text-[#15803d] hover:font-bold transition-all">
             <ShoppingBag className="w-4 h-4" /> Shop
          </Link>
          {/* NEW: Cart Link */}
          <Link to="/cart" className="flex items-center gap-1 hover:text-[#15803d] hover:font-bold transition-all">
             <ShoppingCart className="w-4 h-4" /> Cart
          </Link>
        </div>

        {/* === RIGHT ACTIONS === */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-100">
            <Phone className="w-4 h-4 text-[#15803d]" />
            <span className="text-sm font-bold text-[#15803d]">1800-KISSAN</span>
          </div>

          {/* DYNAMIC AUTH BUTTONS */}
          {user ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:flex flex-col items-end">
                <Link to="/profile" className="text-sm font-bold text-[#1a2e05] hover:text-[#15803d] transition-colors">
                  Hi, {user.name.split(' ')[0]}
                </Link>
                <span className="text-[10px] text-gray-500 uppercase">{user.role}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden md:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="hidden md:flex bg-[#15803d] hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-green-700/20 items-center gap-2 cursor-pointer">
                <User className="w-4 h-4" />
                <span>Login</span>
              </button>
            </Link>
          )}
          
          {/* MOBILE MENU BUTTON */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-gray-600 cursor-pointer">
             {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* === MOBILE MENU DROPDOWN === */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 top-full p-4 shadow-xl flex flex-col gap-4">
          <Link to="/" onClick={() => setIsOpen(false)} className="font-bold text-gray-600 p-2">Home</Link>
          <Link to="/market" onClick={() => setIsOpen(false)} className="font-bold text-gray-600 p-2">Shop</Link>
          <Link to="/cart" onClick={() => setIsOpen(false)} className="font-bold text-gray-600 p-2">My Cart</Link>
          <Link to="/features" onClick={() => setIsOpen(false)} className="font-bold text-gray-600 p-2">Features</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="font-bold text-gray-600 p-2">Mission</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="font-bold text-gray-600 p-2">Contact</Link>
          
          {user ? (
            <>
              <Link to="/profile" onClick={() => setIsOpen(false)} className="font-bold text-[#15803d] p-2 bg-green-50 rounded-lg">
                My Profile ({user.name})
              </Link>
              
              {/* LOGIC FIX MOBILE: Show Dashboard ONLY if Farmer or Admin */}
              {(user.role === 'admin' || user.role === 'farmer') && (
                <Link 
                  to={user.role === 'admin' ? "/dashboard/admin" : "/dashboard/farmer"} 
                  onClick={() => setIsOpen(false)} 
                  className="font-bold text-[#15803d] p-2"
                >
                  Dashboard
                </Link>
              )}

              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full bg-red-50 text-red-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-[#15803d] text-white py-3 rounded-xl font-bold">Login / Register</button>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;