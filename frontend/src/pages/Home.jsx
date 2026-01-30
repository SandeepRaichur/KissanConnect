import React from 'react';
import { ArrowRight, TrendingUp, CloudRain, Handshake, MapPin, Umbrella, Phone, ShoppingBag, Upload, Users, Truck } from 'lucide-react';
import farmerImg from '../assets/farmer.png';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="pt-20 pb-10 overflow-x-hidden font-sans">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative px-6 py-12 lg:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <div className="z-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#d9f99d]/30 text-[#15803d] text-sm font-bold mb-6 border border-[#d9f99d]">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              Live Mandi Prices Available
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-dark leading-[1.1] mb-6">
              Best Price for <br />
              <span className="text-primary underline decoration-accent decoration-8 underline-offset-4">
                Your Harvest.
              </span>
            </h1>
            
            <p className="text-lg text-gray-500 mb-8 leading-relaxed max-w-lg font-medium">
              India's most trusted digital mandi. Sell directly to buyers, get instant payments, and protect your crops with AI weather alerts.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Link to Farmer Dashboard */}
              <Link to="/dashboard/farmer">
                <button className="w-full sm:w-auto bg-primary hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-green-700/20 flex items-center justify-center gap-2 hover:-translate-y-1 cursor-pointer">
                  Start Selling <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              
              {/* Link to Marketplace */}
              <Link to="/market">
                <button className="w-full sm:w-auto bg-white border-2 border-gray-100 text-[#15803d] px-8 py-4 rounded-2xl font-bold text-lg hover:border-[#15803d] hover:bg-green-50 transition-all text-center cursor-pointer flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" /> Buy Produce
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative hidden lg:block">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-green-100 to-transparent rounded-full blur-3xl -z-10"></div>
             <div className="relative z-10 rounded-[3rem] overflow-hidden border-[6px] border-white shadow-2xl shadow-green-900/10">
                <img src={farmerImg} alt="Indian Farmer" className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700" />
                
                {/* Floating Stats Card */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-green-50 flex items-center justify-between">
                   <div>
                     <p className="text-xs text-gray-400 font-bold uppercase">Today's Profit</p>
                     <p className="text-xl font-extrabold text-primary">₹ 12,450 <span className="text-sm text-gray-400 font-medium">/ day</span></p>
                   </div>
                   <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-[#15803d]">
                     <TrendingUp className="w-5 h-5" />
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS SECTION (NEW) ================= */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Simple Process</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mt-2">How KissanConnect Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-[#15803d] mx-auto mb-6 shadow-sm group-hover:bg-[#15803d] group-hover:text-white transition-colors">
                <Upload className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1a2e05] mb-3">1. List Your Crop</h3>
              <p className="text-gray-500 leading-relaxed px-4">
                Take a photo, set your price, and list your produce from your phone in under a minute.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-[#15803d] mx-auto mb-6 shadow-sm group-hover:bg-[#15803d] group-hover:text-white transition-colors">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-[#1a2e05] mb-3">2. Connect with Buyers</h3>
              <p className="text-gray-500 leading-relaxed px-4">
                Verified buyers from across India will see your listing and place orders directly.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center group">
              <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center text-[#15803d] mx-auto mb-6 shadow-sm group-hover:bg-[#15803d] group-hover:text-white transition-colors">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-dark mb-3">3. Secure Payment & Pickup</h3>
              <p className="text-gray-500 leading-relaxed px-4">
                Get paid securely and the buyer arranges the transport from your farm gate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION (UPDATED IMAGES) ================= */}
      <section className="bg-[#f8fafc] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider uppercase text-sm">Built for Bharat</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-dark mt-2">Technology that Protects You</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* FEATURE 1: PRICE TRACKER */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-xl shadow-green-900/5 hover:-translate-y-2 transition-transform duration-500">
              <div className="h-56 relative">
                {/* Real Image of a Mandi/Market */}
                <img src="https://www.forbes.com/advisor/wp-content/uploads/2023/03/Line_Chart.png" alt="Mandi Price Tracker" className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <div className="w-8 h-8 bg-[#15803d] rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                  <span className="font-bold">Live Mandi Rates</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#1a2e05] mb-2">Smart Price Tracker</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Compare rates from 5 nearby Mandis before you sell. Always get the highest profit.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-[#15803d] bg-green-50 p-3 rounded-lg">
                   <MapPin className="w-4 h-4" /> Covers 500+ Mandis
                </div>
              </div>
            </div>

            {/* FEATURE 2: WEATHER ALERTS */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-xl shadow-green-900/5 hover:-translate-y-2 transition-transform duration-500">
              <div className="h-56 relative">
                {/* Real Image of a Stormy Field */}
                <img src="https://images.unsplash.com/photo-1530563885674-66db50a1af19?auto=format&fit=crop&q=80&w=600" alt="Weather Alert" className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <CloudRain className="w-4 h-4" />
                  </div>
                  <span className="font-bold">Weather Alerts</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#1a2e05] mb-2">Fasal Suraksha</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Get hyper-local weather alerts 48 hours in advance. Know when to cover crops or delay irrigation.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 p-3 rounded-lg">
                   <Umbrella className="w-4 h-4" /> Save your harvest
                </div>
              </div>
            </div>

            {/* FEATURE 3: KISSAN MITRA */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-xl shadow-green-900/5 hover:-translate-y-2 transition-transform duration-500">
              <div className="h-56 relative">
                {/* Real Image of Farmer and Agent */}
                <img src="https://images.unsplash.com/photo-1605000797499-95a51c5269ae?auto=format&fit=crop&q=80&w=600" alt="Kissan Mitra" className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <Handshake className="w-4 h-4" />
                  </div>
                  <span className="font-bold">Local Support</span>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-[#1a2e05] mb-2">Kissan Mitra</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-6">
                  Don't know how to use the app? Call a local "Kissan Mitra" agent to visit your farm and help you sell.
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-orange-700 bg-orange-50 p-3 rounded-lg">
                   <Phone className="w-4 h-4" /> 5,000+ Agents Active
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
      
      {/* (Removed the Bottom Banner Section here) */}

    </div>
  );
};

export default Home;