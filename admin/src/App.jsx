import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Home } from "./components/Home/Home";

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin-dashboard/:admin-name" element={<Dashboard />} />
          <Route path="/admin-login" element={<Login />} />
          <Route path="/admin-register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
