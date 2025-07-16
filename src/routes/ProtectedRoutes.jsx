import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ children }) => {
  const { user, loading, success, isLoggedIn } = useSelector(
    (state) => state.auth
  );
  console.log("user before....", user, "isLoggedIn", isLoggedIn);

  if (loading) {
    return <p className="text-3xl">Loading..</p>;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoutes;
