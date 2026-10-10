import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sprout, ShoppingBag, Eye, EyeOff } from 'lucide-react';
import { apiUrl } from '../config/api';

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('farmer');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full Name is required";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email";
    
    const password = formData.password;
    if (password.length < 8) newErrors.password = "Must be at least 8 characters";
    else if (password[0] !== password[0].toUpperCase()) newErrors.password = "First letter must be Capital";
    else if (!/\d/.test(password)) newErrors.password = "Must contain a number";
    else if (!/[!@#$%^&*]/.test(password)) newErrors.password = "Must contain a special char";

    if (password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsLoading(true);
      try {
        const response = await fetch(apiUrl('/api/users/register'), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
            role: role,
          }),
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          alert("Registration Successful! Please Login.");
          navigate('/login');
        } else {
          alert(data.message || "Registration Failed");
        }
      } catch (error) {
        alert("Unable to connect to the server. Please ensure the backend is running.");
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] px-4 pt-24 pb-10">
      <div className="bg-white p-8 rounded-[2rem] shadow-xl shadow-green-900/5 w-full max-w-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-[#1a2e05] mb-2">Create Account</h2>
        <p className="text-center text-gray-500 text-sm mb-6">Join KissanConnect today</p>

        {/* Role Selection */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button type="button" onClick={() => setRole('farmer')} className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${role === 'farmer' ? 'border-[#15803d] bg-green-50 text-[#15803d]' : 'border-gray-100 text-gray-400'}`}>
            <Sprout className="w-6 h-6" /> <span className="font-bold text-sm">Farmer</span>
          </button>
          <button type="button" onClick={() => setRole('buyer')} className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${role === 'buyer' ? 'border-[#15803d] bg-green-50 text-[#15803d]' : 'border-gray-100 text-gray-400'}`}>
            <ShoppingBag className="w-6 h-6" /> <span className="font-bold text-sm">Buyer</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1 ml-1">Full Name</label>
            <input type="text" name="fullName" onChange={handleChange} className={`w-full bg-gray-50 border rounded-xl p-3 outline-none focus:border-[#15803d] ${errors.fullName ? 'border-red-500' : 'border-gray-200'}`} placeholder="Ramesh Kumar" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1 ml-1">Email</label>
            <input type="email" name="email" onChange={handleChange} className={`w-full bg-gray-50 border rounded-xl p-3 outline-none focus:border-[#15803d] ${errors.email ? 'border-red-500' : 'border-gray-200'}`} placeholder="ramesh@gmail.com" />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1 ml-1">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" onChange={handleChange} className={`w-full bg-gray-50 border rounded-xl p-3 outline-none pr-10 focus:border-[#15803d] ${errors.password ? 'border-red-500' : 'border-gray-200'}`} placeholder="Create password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-400">{showPassword ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}</button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase mb-1 ml-1">Confirm Password</label>
            <input type="password" name="confirmPassword" onChange={handleChange} className={`w-full bg-gray-50 border rounded-xl p-3 outline-none focus:border-[#15803d] ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'}`} placeholder="Repeat password" />
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          <button disabled={isLoading} className="w-full bg-[#15803d] hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-green-700/20 mt-4 cursor-pointer disabled:opacity-50">
            {isLoading ? 'Registering...' : `Register as ${role === 'farmer' ? 'Farmer' : 'Buyer'}`}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">Already have an account? <Link to="/login" className="text-[#15803d] font-bold hover:underline">Login here</Link></p>
      </div>
    </div>
  );
};

export default Signup;