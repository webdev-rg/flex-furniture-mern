import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Signup } from "./components/Signup/Signup";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { Home } from "./components/Home/Home";
import { Signin } from "./components/Signin/Signin";
import { Categories } from "./components/Categories/Categories";
import { AddProductForm } from "./components/AddProductForm/AddProductForm";
import { ProductList } from "./components/ProductList/ProductList";
import { AdminDetails } from "./components/AdminDetails/AdminDetails";
import { Orders } from "./components/Orders/Orders";

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
            adminLoggedIn === false ? <Home /> : <Navigate to="/admin" />
          }
        />
        <Route
          path="/admin"
          element={
            adminLoggedIn ? <Dashboard /> : <Navigate to="/admin-signin" />
          }
        >
          <Route
            path="dashboard"
            element={<AdminDetails isLoggedIn={setAdminLoggedIn} />}
          />
          <Route path="category-list" element={<Categories />} />
          <Route path="add-new-product" element={<AddProductForm />} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="orders" element={<Orders />} />
        </Route>
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
