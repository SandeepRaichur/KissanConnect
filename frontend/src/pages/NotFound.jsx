import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] text-center px-4">
      <h1 className="text-9xl font-extrabold text-[#15803d] opacity-20">404</h1>
      <h2 className="text-3xl font-bold text-[#1a2e05] -mt-10 mb-4">This field is empty!</h2>
      <p className="text-gray-500 mb-8 max-w-md">
        Looks like you wandered too far from the farm. The page you are looking for has not been planted yet.
      </p>
      <Link to="/" className="bg-[#15803d] text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg">
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;