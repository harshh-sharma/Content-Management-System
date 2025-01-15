import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = useSelector(store => store.auth['x-access-token']);

  if (!token) {
    // If no token, redirect to login
    return <Navigate to="/login" />;
  }

  // If authenticated, render the child components
  return children;
};

export default ProtectedRoute;
