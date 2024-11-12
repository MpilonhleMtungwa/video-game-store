import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? (
    children
  ) : (
    // Redirect to login with the previous location saved in `state`
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default ProtectedRoute;
