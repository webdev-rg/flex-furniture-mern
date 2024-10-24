import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { NavLink, Outlet } from "react-router-dom";

export const Dashboard = ({ isLoggedIn }) => {
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
        <div className="w-[20%] border-r border-r-gray-300">
          <div className="w-full h-full p-10 flex flex-col gap-5">
            <div className="w-full">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `inline-block w-full px-10 py-6 ${
                    isActive ? "bg-slate-100" : ""
                  }  text-3xl text-flex-furniture-950 font-medium rounded-2xl`
                }
              >
                Dashboard
              </NavLink>
            </div>
            <div className="w-full">
              <NavLink
                to="/admin/category-list"
                className={({ isActive }) =>
                  `inline-block w-full px-10 py-6 ${
                    isActive ? "bg-slate-100" : ""
                  }  text-3xl text-flex-furniture-950 font-medium rounded-2xl`
                }
              >
                Categories
              </NavLink>
            </div>
            <div className="w-full">
              <NavLink
                to="/admin/add-new-product"
                className={({ isActive }) =>
                  `inline-block w-full px-10 py-6 ${
                    isActive ? "bg-slate-100" : ""
                  }  text-3xl text-flex-furniture-950 font-medium rounded-2xl`
                }
              >
                Add New Product
              </NavLink>
            </div>
            <div className="w-full">
              <NavLink
                to="/admin/product-list"
                className={({ isActive }) =>
                  `inline-block w-full px-10 py-6 ${
                    isActive ? "bg-slate-100" : ""
                  }  text-3xl text-flex-furniture-950 font-medium rounded-2xl`
                }
              >
                Product List
              </NavLink>
            </div>
            <div className="w-full">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `inline-block w-full px-10 py-6 ${
                    isActive ? "bg-slate-100" : ""
                  }  text-3xl text-flex-furniture-950 font-medium rounded-2xl`
                }
              >
                User List
              </NavLink>
            </div>
            <div className="w-full">
              <NavLink
                to="/admin/orders"
                className={({ isActive }) =>
                  `inline-block w-full px-10 py-6 ${
                    isActive ? "bg-slate-100" : ""
                  }  text-3xl text-flex-furniture-950 font-medium rounded-2xl`
                }
              >
                Orders
              </NavLink>
            </div>
          </div>
        </div>
        <div className="w-[80%]">
          <Outlet />
        </div>
      </div>
    </>
  );
};
