import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './context/authContext';

export function AdminRoutes() {
  const { isAuthenticated, loading, isAdmin } = useAuth();
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
