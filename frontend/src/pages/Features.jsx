import React from 'react';
import { TrendingUp, CloudRain, Handshake, Phone, MapPin, Umbrella, Wind } from 'lucide-react';

const Features = () => {
  return (
    <div className="pt-24 pb-20 px-6 min-h-screen bg-[#f8fafc]">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <span className="text-[#15803d] font-bold tracking-wider uppercase text-sm">Built for Bharat</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a2e05] mt-4 mb-6">
          Technology that speaks <br />
          <span className="text-[#15803d]">Your Language.</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto">
          We removed the complexity. Simple tools to help you track prices, protect your crops, and get local support.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* === FEATURE 1: SMART PRICE TRACKER === */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-xl shadow-green-900/5 hover:-translate-y-2 transition-transform duration-500">
          <div className="bg-green-50 p-8 h-64 relative flex flex-col justify-center items-center">
             <div className="w-full bg-white rounded-xl shadow-sm border border-green-100 p-4 space-y-3 relative z-10">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                   <span className="text-xs font-bold text-gray-500">Market</span>
                   <span className="text-xs font-bold text-gray-500">Price/Qt</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-sm font-bold text-[#1a2e05]">Azadpur Mandi</span>
                   <span className="text-sm font-bold text-[#15803d]">₹ 2,400</span>
                </div>
                <div className="flex justify-between items-center">
                   <span className="text-sm font-bold text-[#1a2e05]">Local Market</span>
                   <span className="text-sm font-bold text-red-500">₹ 2,100</span>
                </div>
             </div>
             <div className="absolute top-4 right-4 w-12 h-12 bg-[#15803d] rounded-full flex items-center justify-center text-white shadow-lg z-20">
                <TrendingUp className="w-6 h-6" />
             </div>
          </div>
          
          <div className="p-8">
            <h3 className="text-2xl font-bold text-[#1a2e05] mb-2">Smart Price Tracker</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Don't sell blindly. We show you real-time prices from 5 nearby Mandis. Compare the rates and sell where you get the highest profit.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-[#15803d] bg-green-50 p-3 rounded-lg">
               <MapPin className="w-4 h-4" /> Covers 500+ Mandis
            </div>
          </div>
        </div>

        {/* === FEATURE 2: FASAL SURAKSHA (Weather Alerts) === */}
        {/* REPLACED LIVE BOLI WITH WEATHER */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-xl shadow-green-900/5 hover:-translate-y-2 transition-transform duration-500">
          <div className="bg-blue-50 p-8 h-64 relative flex flex-col justify-center items-center text-center">
             
             {/* Weather Widget Mockup */}
             <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-blue-100 w-full max-w-[200px] shadow-sm relative z-10">
                <div className="flex justify-between items-center mb-2">
                   <span className="text-xs font-bold text-gray-500">Tomorrow</span>
                   <CloudRain className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-3xl font-extrabold text-[#1a2e05] mb-1">24°C</p>
                <p className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded inline-block">Heavy Rain Alert ⚠️</p>
             </div>

             {/* Background Decoration */}
             <div className="absolute top-6 right-6 w-16 h-16 bg-yellow-300 rounded-full blur-2xl opacity-40"></div>
          </div>
          
          <div className="p-8">
            <h3 className="text-2xl font-bold text-[#1a2e05] mb-2">Fasal Suraksha (Weather)</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Rain can ruin a harvest in minutes. Get hyper-local weather alerts 48 hours in advance so you can cover your crops or delay irrigation.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-700 bg-blue-50 p-3 rounded-lg">
               <Umbrella className="w-4 h-4" /> Save your harvest
            </div>
          </div>
        </div>

        {/* === FEATURE 3: KISSAN MITRA (Offline Help) === */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 overflow-hidden shadow-xl shadow-green-900/5 hover:-translate-y-2 transition-transform duration-500">
          <div className="bg-orange-50 p-8 h-64 relative flex flex-col justify-center items-center text-center">
             <div className="relative z-10 w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-lg mb-4">
                <Handshake className="w-10 h-10" />
             </div>
             <p className="text-orange-900 font-bold text-lg">Ramesh Kumar</p>
             <p className="text-xs text-orange-600 bg-orange-100 px-3 py-1 rounded-full mt-1">Your Local Mitra</p>
          </div>
          
          <div className="p-8">
            <h3 className="text-2xl font-bold text-[#1a2e05] mb-2">Kissan Mitra</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Don't know how to use the app? No problem. Call a "Kissan Mitra" (Agent) from your village. They will come to your farm and help you sell.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-orange-700 bg-orange-50 p-3 rounded-lg">
               <Phone className="w-4 h-4" /> 5,000+ Agents Active
            </div>
          </div>
        </div>

      </div>

      {/* Trust Banner */}
      <div className="max-w-5xl mx-auto mt-20 bg-[#1a2e05] rounded-[3rem] p-10 text-white flex flex-col md:flex-row items-center justify-between shadow-2xl">
         <div className="mb-6 md:mb-0">
           <h2 className="text-3xl font-bold mb-4">Simple. Honest. Profitable.</h2>
           <p className="text-green-100 max-w-lg">
             You work hard on the field. We make sure selling is easy. 
             No hidden charges, no complicated forms.
           </p>
         </div>
         <button className="bg-[#d9f99d] text-[#1a2e05] px-10 py-4 rounded-2xl font-bold hover:bg-white transition-colors shadow-lg shadow-green-900/50 flex items-center gap-2 cursor-pointer">
           <Wind className="w-5 h-5" /> Check Weather Now
         </button>
      </div>

    </div>
  );
};

export default Features;