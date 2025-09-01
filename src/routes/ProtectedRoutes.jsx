import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { FadeLoader } from "react-spinners";

const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <FadeLoader color="#002aff" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRoutes;
