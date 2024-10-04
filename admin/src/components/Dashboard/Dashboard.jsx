import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import {
  TbCategoryPlus,
  TbShoppingCartPlus,
  TbList,
  TbUsers,
} from "react-icons/tb";

export const Dashboard = ({ isLoggedIn }) => {
  const [activeTab, setActiveTab] = useState("");
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
      <div className="w-full h-screen pt-32 flex justify-between">
        <div className="w-[20%] border-r border-r-flex-furniture-100">
          <div className="w-full h-full p-10 flex flex-col gap-5">
            <div
              className="w-full p-8 bg-flex-furniture-50 rounded-2xl"
              onClick={() => setActiveTab("add-new-category")}
            >
              <h1 className="text-3xl font-medium text-flex-furniture-950 tracking-wide flex items-center gap-3">
                <TbCategoryPlus /> Add New Category
              </h1>
            </div>
            <div
              className="w-full p-8 bg-flex-furniture-50 rounded-2xl"
              onClick={() => setActiveTab("add-new-product")}
            >
              <h1 className="text-3xl font-medium text-flex-furniture-950 tracking-wide flex items-center gap-3">
                <TbShoppingCartPlus />
                Add New Product
              </h1>
            </div>
            <div
              className="w-full p-8 bg-flex-furniture-50 rounded-2xl"
              onClick={() => setActiveTab("product-list")}
            >
              <h1 className="text-3xl font-medium text-flex-furniture-950 tracking-wide flex items-center gap-3">
                <TbList />
                Product List
              </h1>
            </div>
            <div
              className="w-full p-8 bg-flex-furniture-50 rounded-2xl"
              onClick={() => setActiveTab("user-list")}
            >
              <h1 className="text-3xl font-medium text-flex-furniture-950 tracking-wide flex items-center gap-3">
                <TbUsers />
                User List
              </h1>
            </div>
            <div
              className="w-full p-8 bg-flex-furniture-50 rounded-2xl"
              onClick={() => setActiveTab("orders")}
            >
              <h1 className="text-3xl font-medium text-flex-furniture-950 tracking-wide flex items-center gap-3">
                Orders
              </h1>
            </div>
          </div>
        </div>
        <div className="w-[80%]">
          <div className="w-full h-full p-10">
            <h1>
              {activeTab === "add-new-category" ? "add-new-category" : ""}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};
