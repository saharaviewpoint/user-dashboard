import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { authApi } from "../app/services/auth/authService";

const ProtectedRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);
  let location = useLocation();

  if (!userInfo) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
