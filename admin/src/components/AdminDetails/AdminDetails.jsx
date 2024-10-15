import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AdminDetails = ({ isLoggedIn }) => {
  const [adminData, setAdminData] = useState(() => {
    return JSON.parse(localStorage.getItem("adminData"));
  });

  useEffect(() => {
    localStorage.setItem("adminData", JSON.stringify(adminData));
  }, [adminData]);

  const navigate = useNavigate();

  const handleLogout = () => {
    isLoggedIn(false);
    localStorage.removeItem("adminData");
    setAdminData(null);
    navigate("/");
  };
  return (
    <div className="w-full h-full p-10 flex flex-col gap-10">
      <h1 className="text-5xl text-flex-furniture-950 font-semibold tracking-wide">
        Welcome to Admin Panel
      </h1>
      <h1 className="text-3xl text-flex-furniture-950 font-semibold">
        Admin ID: <span className="font-normal">{adminData._id}</span>
      </h1>
      <h1 className="text-3xl text-flex-furniture-950 font-semibold">
        Admin Name:{" "}
        <span className="font-normal">
          {adminData.firstName} {adminData.lastName}
        </span>
      </h1>
      <h1 className="text-3xl text-flex-furniture-950 font-semibold">
        Admin Email: <span className="font-normal">{adminData.email}</span>
      </h1>
      <div>
        <button
          className="px-10 py-4 bg-red-600 hover:bg-red-500 transition-all duration-300 text-2xl text-white font-bold tracking-wide rounded-2xl"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};
