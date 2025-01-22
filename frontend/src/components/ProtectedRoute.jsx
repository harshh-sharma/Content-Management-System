import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = useSelector((store) => store.auth['x-access-token']);
  const userRole = useSelector((store) => store?.auth?.role);

  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Redirect to unauthorized page if role is insufficient
  if (
    requiredRole && 
    (Array.isArray(requiredRole) 
      ? !requiredRole.includes(userRole) 
      : userRole !== requiredRole)
  ) {
    return <Navigate to="/unauthorized" />;
  }

  // Render children if both conditions pass
  return children;
};

export default ProtectedRoute;
