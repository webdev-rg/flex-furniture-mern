import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup/Signup";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Home } from "./components/Home/Home";
import { Signin } from "./components/Signin/Signin";

export const App = () => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(() => {
    return localStorage.getItem("adminLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("adminLoggedIn", adminLoggedIn);
  }, [adminLoggedIn]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            adminLoggedIn === false ? (
              <Home />
            ) : (
              <Navigate to="/admin-dashboard" />
            )
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            adminLoggedIn ? (
              <Dashboard isLoggedIn={setAdminLoggedIn} />
            ) : (
              <Navigate to="/admin-signin" />
            )
          }
        />
        <Route
          path="/admin-signin"
          element={
            !adminLoggedIn ? (
              <Signin isLoggedIn={setAdminLoggedIn} />
            ) : (
              <Navigate to="/admin-dashboard" />
            )
          }
        />
        <Route
          path="/admin-signup"
          element={
            !adminLoggedIn ? <Signup /> : <Navigate to="/admin-dashboard" />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
