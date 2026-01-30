import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-24 pb-20 px-6 min-h-screen bg-[#f8fafc]">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white rounded-[3rem] p-8 md:p-12 shadow-xl shadow-gray-200/50">
        
        {/* Left: Info */}
        <div className="flex flex-col justify-center">
          <span className="text-[#15803d] font-bold tracking-wider uppercase text-sm mb-2">Get in Touch</span>
          <h1 className="text-4xl font-extrabold text-[#1a2e05] mb-6">We are here to help.</h1>
          <p className="text-gray-500 mb-10">Have questions about selling your crop? Need technical support? Our team is available 24/7 for our Annadatas.</p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f8fafc] border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-[#15803d]"><Phone className="w-5 h-5"/></div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Helpline</p>
                <p className="text-lg font-bold text-[#1a2e05]">1800-KISSAN (547726)</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f8fafc] border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-[#15803d]"><Mail className="w-5 h-5"/></div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Email Support</p>
                <p className="text-lg font-bold text-[#1a2e05]">support@kissanconnect.in</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f8fafc] border border-gray-100">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-[#15803d]"><MapPin className="w-5 h-5"/></div>
              <div>
                <p className="text-xs text-gray-500 font-bold uppercase">Headquarters</p>
                <p className="text-lg font-bold text-[#1a2e05]">Tech Park, Bangalore, India</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="bg-[#15803d] rounded-[2rem] p-8 text-white relative overflow-hidden">
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#d9f99d] rounded-full blur-[60px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
          
          <h2 className="text-2xl font-bold mb-6 relative z-10">Send us a Message</h2>
          <form className="space-y-4 relative z-10">
            <div>
              <label className="text-sm font-medium text-green-100 ml-1">Your Name</label>
              <input type="text" className="w-full mt-1 bg-white/10 border border-white/20 rounded-xl p-3 text-white outline-none focus:border-[#d9f99d] transition-all" placeholder="Enter name" />
            </div>
            <div>
              <label className="text-sm font-medium text-green-100 ml-1">Phone Number</label>
              <input type="text" className="w-full mt-1 bg-white/10 border border-white/20 rounded-xl p-3 text-white outline-none focus:border-[#d9f99d] transition-all" placeholder="+91" />
            </div>
            <div>
              <label className="text-sm font-medium text-green-100 ml-1">Message</label>
              <textarea rows="4" className="w-full mt-1 bg-white/10 border border-white/20 rounded-xl p-3 text-white outline-none focus:border-[#d9f99d] transition-all" placeholder="How can we help?"></textarea>
            </div>
            <button className="w-full bg-[#d9f99d] text-[#15803d] font-bold py-4 rounded-xl hover:bg-white transition-all shadow-lg mt-2 cursor-pointer">
              Send Message
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;