import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import {
  TbCategoryPlus,
  TbShoppingCartPlus,
  TbList,
  TbUsers,
  TbLayoutDashboard,
} from "react-icons/tb";
import { Categories } from "../Categories/Categories";
import { AddProductForm } from "../AddProductForm/AddProductForm";
import { ProductList } from "../ProductList/ProductList";

export const Dashboard = ({ isLoggedIn }) => {
  const dashboardHeight = {
    height: "calc(100vh - 80px)",
  };
  const [activeTab, setActiveTab] = useState("product-list");
  const [adminData, setAdminData] = useState(() => {
    return JSON.parse(localStorage.getItem("adminData"));
  });

  useEffect(() => {
    localStorage.setItem("adminData", JSON.stringify(adminData));
  }, [adminData]);
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        adminData={adminData}
        setAdminData={setAdminData}
      />
      <div
        // style={dashboardHeight}
        className="w-full h-screen pt-32 flex justify-between"
      >
        <div className="w-[20%] border-r border-r-flex-furniture-100">
          <div className="w-full h-full p-10 flex flex-col gap-5">
            <div
              className={`w-full px-10 py-6 ${
                activeTab === "dashboard" ? "bg-slate-100" : ""
              } rounded-2xl cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out`}
              onClick={() => setActiveTab("dashboard")}
            >
              <h1 className="text-3xl font-medium text-flex-furniture-950 tracking-wide flex items-center gap-3">
                <TbLayoutDashboard /> Dashboard
              </h1>
            </div>
            <div
              className={`w-full px-10 py-6 ${
                activeTab === "add-new-category" ? "bg-slate-100" : ""
              } rounded-2xl cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out`}
              onClick={() => setActiveTab("add-new-category")}
            >
              <h1 className="text-3xl font-medium text-flex-furniture-950 tracking-wide flex items-center gap-3">
                <TbCategoryPlus /> Categories
              </h1>
            </div>
            <div
              className={`w-full px-10 py-6 ${
                activeTab === "add-new-product" ? "bg-slate-100" : ""
              } rounded-2xl cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out`}
              onClick={() => setActiveTab("add-new-product")}
            >
              <h1 className="text-3xl font-medium text-flex-furniture-950 tracking-wide flex items-center gap-3">
                <TbShoppingCartPlus />
                Add New Product
              </h1>
            </div>
            <div
              className={`w-full px-10 py-6 ${
                activeTab === "product-list" ? "bg-slate-100" : ""
              } rounded-2xl cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out`}
              onClick={() => setActiveTab("product-list")}
            >
              <h1 className="text-3xl font-medium text-flex-furniture-950 tracking-wide flex items-center gap-3">
                <TbList />
                Product List
              </h1>
            </div>
            <div
              className={`w-full px-10 py-6 ${
                activeTab === "user-list" ? "bg-slate-100" : ""
              } rounded-2xl cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out`}
              onClick={() => setActiveTab("user-list")}
            >
              <h1 className="text-3xl font-medium text-flex-furniture-950 tracking-wide flex items-center gap-3">
                <TbUsers />
                User List
              </h1>
            </div>
            <div
              className={`w-full px-10 py-6 ${
                activeTab === "orders" ? "bg-slate-100" : ""
              } rounded-2xl cursor-pointer hover:bg-slate-100 transition-all duration-300 ease-in-out`}
              onClick={() => setActiveTab("orders")}
            >
              <h1 className="text-3xl font-medium text-flex-furniture-950 tracking-wide flex items-center gap-3">
                Orders
              </h1>
            </div>
          </div>
        </div>
        <div className="w-[80%]">
          {activeTab === "dashboard" ? (
            <div className="w-full h-full p-10">
              <h1 className="text-6xl font-semibold text-flex-furniture-950 tracking-wide">
                Welcome to Admin Panel
              </h1>
            </div>
          ) : activeTab === "add-new-category" ? (
            <Categories />
          ) : activeTab === "add-new-product" ? (
            <AddProductForm />
          ) : activeTab === "product-list" ? (
            <ProductList />
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};
