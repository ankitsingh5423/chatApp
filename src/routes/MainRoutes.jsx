import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import NotFound from "../pages/NotFound";
import Dashboard from "../pages/Dashboard";
import ProtectedRoutes from "./ProtectedRoutes";
import PublicRoutes from "./PublicRoutes";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/signin"
        element={
          <PublicRoutes>
            <Signin />
          </PublicRoutes>
        }
      />
      <Route path="/signup"
        element={
          <PublicRoutes>
            <Signup />
          </PublicRoutes>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <Dashboard />
          </ProtectedRoutes>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
