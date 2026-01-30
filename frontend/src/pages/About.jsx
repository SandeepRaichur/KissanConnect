import React from 'react';
import { Target, Heart, Sprout } from 'lucide-react';

const About = () => {
  return (
    <div className="pt-24 pb-20 px-6 min-h-screen bg-white">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="text-[#15803d] font-bold tracking-wider uppercase text-sm">Our Mission</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a2e05] mt-4 mb-6">
          Empowering the <br />
          <span className="underline decoration-[#d9f99d] decoration-8 underline-offset-4">Indian Annadata.</span>
        </h1>
        <p className="text-lg text-gray-500 leading-relaxed">
          KissanConnect was built with a simple goal: To remove the layers of middlemen that eat into a farmer's hard-earned profits. We are building the digital infrastructure for rural India.
        </p>
      </div>

      {/* Grid Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Vision */}
        <div className="bg-[#f8fafc] p-10 rounded-[2.5rem] border border-gray-100 hover:border-[#15803d]/30 transition-all">
          <div className="w-12 h-12 bg-[#15803d] rounded-full flex items-center justify-center text-white mb-6">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a2e05] mb-4">The Vision</h2>
          <p className="text-gray-600 leading-relaxed">
            We envision a future where a farmer in a remote village can sell their produce to a buyer in a metro city with a single click. No agents, no commissions, just fair trade.
          </p>
        </div>

        {/* Card 2: Impact */}
        <div className="bg-[#f8fafc] p-10 rounded-[2.5rem] border border-gray-100 hover:border-[#15803d]/30 transition-all">
          <div className="w-12 h-12 bg-[#d9f99d] rounded-full flex items-center justify-center text-[#15803d] mb-6">
            <Heart className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-[#1a2e05] mb-4">The Impact</h2>
          <p className="text-gray-600 leading-relaxed">
            By 2030, we aim to increase the average income of our partner farmers by 40%. We are not just a marketplace; we are a movement for rural prosperity.
          </p>
        </div>

      </div>

      {/* Team/Technology Section */}
      <div className="max-w-6xl mx-auto mt-8 bg-[#15803d] rounded-[2.5rem] p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">Built with Modern Tech</h2>
          <p className="text-green-100 max-w-lg">
            Using Node.js, React, and MongoDB to ensure the platform is fast, secure, and accessible on every device.
          </p>
        </div>
        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
           <Sprout className="w-8 h-8 text-[#d9f99d]" />
        </div>
      </div>

    </div>
  );
};

export default About;