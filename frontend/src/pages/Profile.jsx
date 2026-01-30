import React, { useState, useEffect } from 'react';
import { User, Mail, Lock, Save, LogOut, Shield, CheckCircle, AlertCircle, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  
  // State for User Data
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // State for UI
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 1. Load User from Local Storage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo) {
      navigate('/login');
    } else {
      setUser(userInfo);
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [navigate]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // Basic Validation
    if (password && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _id: user._id,
          name,
          email,
          password: password || undefined, // Only send if changed
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('userInfo', JSON.stringify(data)); // Update Session
        setUser(data);
        setMessage("Profile Updated Successfully!");
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || "Update Failed");
      }
    } catch (err) {
      setError("Server Error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if(window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('userInfo');
      navigate('/login');
    }
  };

  if (!user) return null;

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen bg-[#f8fafc] flex justify-center items-start">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* === LEFT CARD: IDENTITY === */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-green-900/5 border border-gray-100 flex flex-col items-center text-center h-fit">
          
          {/* Dynamic Avatar with Initials */}
          <div className="relative mb-6 group cursor-pointer">
            <div className="w-32 h-32 bg-gradient-to-br from-[#15803d] to-green-600 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
              {name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </div>
            <div className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md border border-gray-100 group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5 text-gray-500" />
            </div>
          </div>

          <h2 className="text-2xl font-extrabold text-[#1a2e05]">{name}</h2>
          <p className="text-gray-500 text-sm mb-4">{email}</p>

          {/* Role Badge */}
          <div className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-8 flex items-center gap-2 ${user.role === 'farmer' ? 'bg-green-100 text-green-700' : user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
            <Shield className="w-4 h-4" />
            {user.role} Account
          </div>

          <button 
            onClick={handleLogout}
            className="w-full bg-red-50 text-red-600 font-bold py-3 rounded-xl hover:bg-red-100 transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* === RIGHT CARD: EDIT FORM === */}
        <div className="md:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-xl shadow-green-900/5 border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-[#1a2e05]">Account Settings</h3>
            {loading && <span className="text-xs font-bold text-gray-400 animate-pulse">Saving...</span>}
          </div>

          {/* Messages */}
          {message && (
            <div className="mb-6 bg-green-50 text-green-700 p-4 rounded-2xl flex items-center gap-2 text-sm font-bold border border-green-100">
              <CheckCircle className="w-5 h-5" /> {message}
            </div>
          )}
          {error && (
            <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-2xl flex items-center gap-2 text-sm font-bold border border-red-100">
              <AlertCircle className="w-5 h-5" /> {error}
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-6">
            
            {/* Personal Info Section */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2 block">Personal Information</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 flex items-center focus-within:border-[#15803d] focus-within:bg-white transition-all">
                  <User className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 font-bold">Full Name</p>
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="bg-transparent outline-none w-full text-[#1a2e05] font-medium" 
                    />
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 flex items-center focus-within:border-[#15803d] focus-within:bg-white transition-all">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="text-[10px] text-gray-400 font-bold">Email Address</p>
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="bg-transparent outline-none w-full text-[#1a2e05] font-medium" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <hr className="border-gray-100 my-6" />

            {/* Security Section */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1 mb-2 block">Security (Change Password)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 flex items-center focus-within:border-[#15803d] focus-within:bg-white transition-all">
                  <Lock className="w-5 h-5 text-gray-400 mr-3" />
                  <input 
                    type="password" 
                    placeholder="New Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="bg-transparent outline-none w-full text-sm font-medium" 
                  />
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 flex items-center focus-within:border-[#15803d] focus-within:bg-white transition-all">
                  <Lock className="w-5 h-5 text-gray-400 mr-3" />
                  <input 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    className="bg-transparent outline-none w-full text-sm font-medium" 
                  />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="flex justify-end pt-4">
              <button 
                disabled={loading}
                className="bg-[#15803d] hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-green-900/20 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Saving...' : (
                  <>
                    <Save className="w-5 h-5" /> Save Changes
                  </>
                )}
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default Profile;