import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const { user, loading, isAuthenticated } = useAuth();

  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);
  console.log("loading:", loading);

  if (loading) {
    return <div>Loading...</div>; // Or any loading spinner/component
  }

  if (!isAuthenticated) {
    return <Navigate to="/SignUpAndLogin" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
