import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { FadeLoader } from "react-spinners";

const PublicRoutes = ({ children }) => {
  const { user, success, loading, isLoggedIn } = useSelector(
    (state) => state.auth
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FadeLoader color="#002aff" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoutes;
