import React from "react";
import logo from "/images/Admin-Logo.svg";
import { Link, useNavigate } from "react-router-dom";

export const Header = ({ isLoggedIn, adminData, setAdminData }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    isLoggedIn(false);
    setAdminData(null);
    navigate("/");
  };

  return (
    <header className="w-full h-32 px-10 fixed bg-white top-0 left-0 flex items-center justify-between border-b border-b-flex-furniture-100">
      <div className="h-full flex items-center">
        <Link to="/admin-dashboard">
          <img src={logo} className="w-96" alt="admin-logo" />
        </Link>
      </div>
      <div className="h-full flex items-center gap-10">
        <h1 className="text-3xl font-semibold tracking-wide text-flex-furniture-950">
          {adminData.firstName} {adminData.lastName}
        </h1>
        <button
          className="px-10 py-4 bg-red-600 hover:bg-red-500 transition-all duration-300 text-2xl text-white font-bold tracking-wide rounded-2xl"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </header>
  );
};
