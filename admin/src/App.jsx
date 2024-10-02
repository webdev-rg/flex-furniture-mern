import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Dashboard } from "./components/Dashboard/Dashboard";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/admin/admin-dashboard/:admin-name" element={<Dashboard />} />
          <Route path="/admin/admin-login" element={<Login />} />
          <Route path="/admin/admin-register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
