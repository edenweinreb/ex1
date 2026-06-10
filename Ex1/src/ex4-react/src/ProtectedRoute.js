import React from 'react';
import { Navigate } from 'react-router-dom';
 
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
 
  if (!token) {
    // No token: redirect to login
    return <Navigate to="/login" />;
  }
 
  // Has token: show the page
  return children;
}
 
export default ProtectedRoute;