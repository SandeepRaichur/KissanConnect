import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-[#1a2e05] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-800 pb-12">
        
        <div>
          <h2 className="text-2xl font-bold mb-4 text-[#d9f99d]">KissanConnect</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Bridging the gap between Indian farmers and the digital economy.
          </p>
        </div>

        <div>
          <h3 className="font-bold mb-4">Platform</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-[#d9f99d] cursor-pointer">Marketplace</li>
            <li className="hover:text-[#d9f99d] cursor-pointer">Sell Produce</li>
            <li className="hover:text-[#d9f99d] cursor-pointer">Mandi Rates</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="hover:text-[#d9f99d] cursor-pointer">Help Center</li>
            <li className="hover:text-[#d9f99d] cursor-pointer">Contact Us</li>
            <li className="hover:text-[#d9f99d] cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>1800-KISSAN</li>
            <li>Bangalore, India</li>
            <li>help@kissanconnect.in</li>
          </ul>
        </div>

      </div>
      <div className="text-center pt-8 text-xs text-gray-600">
        &copy; 2025 KissanConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;