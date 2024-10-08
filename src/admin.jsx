import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/authContext';

export function AdminRoutes() {
  const { isAuthenticated, loading, isAdmin } = useAuth();

  // Display loading message while checking auth and admin status
  if (loading) {
    return <h1>Loading...</h1>;
  }

  // If the user is not authenticated or not an admin, redirect to home
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // If authenticated and is admin, render the protected content
  return <Outlet />;
}
