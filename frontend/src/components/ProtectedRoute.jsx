import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
  // 1. Get user from local storage
  let user = null;
  try {
    const userLogin = localStorage.getItem('userInfo');
    user = userLogin ? JSON.parse(userLogin) : null;
  } catch {
    user = null;
  }

  // 2. If no user is logged in, kick them to Login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If user exists but role is not allowed (e.g. Buyer trying to see Admin)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />; // Kick them to Home
  }

  // 4. If all checks pass, show the page
  return children;
};

export default ProtectedRoute;