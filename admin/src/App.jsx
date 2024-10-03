import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup/Signup";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Home } from "./components/Home/Home";
import { Signin } from "./components/Signin/Signin";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/admin-signin" element={<Signin />} />
          <Route path="/admin-signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
