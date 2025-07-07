import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import NotFound from "../pages/NotFound";

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default MainRoutes;
