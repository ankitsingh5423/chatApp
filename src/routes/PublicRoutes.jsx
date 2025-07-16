import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const PublicRoutes = ({ children }) => {
  const { user, loading, success, isLoggedIn } = useSelector(
    (state) => state.auth
  );
  console.log("user before....", user);


  if (loading) {
    return <p className="text-3xl">Loading..</p>;
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoutes;
