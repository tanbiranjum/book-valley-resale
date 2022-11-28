import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useRole from "../../hooks/UseRole/useRole";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role] = useRole();
  const location = useLocation();

  if (loading) {
    return "loading";
  }

  if (user && role === "seller") {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default SellerRoute;
