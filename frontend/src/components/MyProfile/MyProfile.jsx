import React, { useContext, useState } from "react";
import { UserDetail } from "./UserDetail";
import { useNavigate } from "react-router-dom";
import { Data } from "../DataProvider/DataProvider";
import { OrderList } from "./OrderList";
import { Settings } from "./Settings";

export const MyProfile = () => {
  const [activeTab, setActiveTab] = useState("my-profile");
  const { setIsUserLoggedIn, URL } = useContext(Data);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="w-full h-full p-32 bg-slate-100">
      <div className="w-full h-full py-10">
        <div className="w-full h-full flex justify-between gap-10">
          <div className="w-[25%] h-full p-10 bg-white rounded-2xl flex flex-col gap-5">
            <div className="w-full flex flex-col items-center gap-5">
              <div className="w-60 h-60 border rounded-full flex items-center justify-center">
                <label htmlFor="user-profile-image" className="cursor-pointer">
                  <img
                    src="/images/user.png"
                    className="w-full h-full"
                    alt="user-profile"
                  />
                </label>
                <input
                  type="file"
                  name="user-profile-image"
                  id="user-profile-image"
                  hidden
                />
              </div>
              <div className="w-full flex flex-col items-center">
                <h1 className="text-3xl text-flex-furniture-950 font-bold leading-relaxed">
                  Rushikesh Ghodke
                </h1>
                <h2 className="text-2xl text-flex-furniture-950 font-light tracking-wide leading-relaxed">
                  rushighodke01@gmail.com
                </h2>
              </div>
            </div>
            <div className="w-full">
              <ul className="w-full flex flex-col gap-5">
                <li
                  className={`w-full py-4 px-10 ${
                    activeTab === "my-profile"
                      ? "border border-slate-200"
                      : "border border-transparent"
                  } rounded-2xl flex items-center gap-5 cursor-pointer`}
                  onClick={() => setActiveTab("my-profile")}
                >
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                    <i className="fi fi-rr-user text-2xl"></i>
                  </div>
                  <h1 className="text-3xl text-flex-furniture-950 font-medium">
                    My Profile
                  </h1>
                </li>
                <li
                  className={`w-full py-4 px-10 ${
                    activeTab === "order-list"
                      ? "border border-slate-200"
                      : "border border-transparent"
                  } rounded-2xl flex items-center gap-5 cursor-pointer`}
                  onClick={() => setActiveTab("order-list")}
                >
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                    <i className="fi fi-rr-shopping-bag text-2xl"></i>
                  </div>
                  <h1 className="text-3xl text-flex-furniture-950 font-medium">
                    My Order List
                  </h1>
                </li>
                <li
                  className={`w-full py-4 px-10 ${
                    activeTab === "settings"
                      ? "border border-slate-200"
                      : "border border-transparent"
                  } rounded-2xl flex items-center gap-5 cursor-pointer`}
                  onClick={() => setActiveTab("settings")}
                >
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                    <i className="fi fi-rr-settings text-2xl"></i>
                  </div>
                  <h1 className="text-3xl text-flex-furniture-950 font-medium">
                    Settings
                  </h1>
                </li>
                <li
                  className={`w-full py-4 px-10 ${
                    activeTab === "logout"
                      ? "border border-slate-200"
                      : "border border-transparent"
                  } rounded-2xl flex items-center gap-5 cursor-pointer`}
                  onClick={() => {
                    setActiveTab("logout");
                    handleLogout();
                  }}
                >
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                    <i className="fi fi-rr-sign-out-alt text-2xl"></i>
                  </div>
                  <h1 className="text-3xl text-flex-furniture-950 font-medium">
                    Logout
                  </h1>
                </li>
              </ul>
            </div>
          </div>
          <div className="w-[75%] h-full bg-white rounded-2xl">
            {activeTab === "my-profile" ? (
              <UserDetail URL={URL} />
            ) : activeTab === "order-list" ? (
              <OrderList />
            ) : activeTab === "settings" ? (
              <Settings setIsUserLoggedIn={setIsUserLoggedIn} URL={URL} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
