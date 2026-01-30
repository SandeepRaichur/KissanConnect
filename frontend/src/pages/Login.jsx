import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Eye, EyeOff, AlertCircle } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // === THIS IS THE MISSING FUNCTION ===
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };
  // ====================================

  const validate = () => {
    let newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('userInfo', JSON.stringify(data));
          alert(`Welcome back, ${data.name}!`);
          
          // Redirect based on role
          if (data.role === 'admin') {
            navigate('/dashboard/admin');
          } else if (data.role === 'farmer') {
            navigate('/dashboard/farmer');
          } else {
            navigate('/');
          }
        } else {
          alert(data.message || "Invalid Email or Password");
        }
      } catch (error) {
        alert("Server Error: Is the Backend running?");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 pt-20">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-green-900/5 w-full max-w-md border border-gray-100">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#15803d] rounded-xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-green-600/20">
            <Leaf className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a2e05]">Welcome Back</h2>
          <p className="text-gray-500 text-sm">Login to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Email Address</label>
            <input 
              type="text" 
              name="email" 
              value={formData.email} // Controlled input
              onChange={handleChange} // Uses the function
              className={`w-full bg-gray-50 border rounded-xl p-3 outline-none transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#15803d]'}`} 
              placeholder="e.g. ramesh@gmail.com" 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.email}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password" 
                value={formData.password} // Controlled input
                onChange={handleChange} // Uses the function
                className={`w-full bg-gray-50 border rounded-xl p-3 outline-none transition-all pr-10 ${errors.password ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-[#15803d]'}`} 
                placeholder="••••••••" 
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-3 top-3 text-gray-400 hover:text-[#15803d]"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> {errors.password}</p>}
            <div className="flex justify-end mt-2">
              <a href="#" className="text-xs font-bold text-[#15803d] hover:underline">Forgot Password?</a>
            </div>
          </div>

          <button 
            disabled={isLoading} 
            className="w-full bg-[#15803d] hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-green-700/20 cursor-pointer flex items-center justify-center disabled:opacity-50"
          >
            {isLoading ? 'Logging in...' : 'Secure Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account? <Link to="/signup" className="text-[#15803d] font-bold hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;