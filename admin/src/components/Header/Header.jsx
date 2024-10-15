import React from "react";
import logo from "/images/Admin-Logo.svg";
import { Link } from "react-router-dom";

export const Header = () => {

  return (
    <header className="w-full h-32 px-10 fixed bg-white top-0 left-0 flex items-center justify-between border-b border-b-flex-furniture-100 z-20">
      <div className="h-full flex items-center">
        <Link to="/admin/dashboard">
          <img src={logo} className="w-96" alt="admin-logo" />
        </Link>
      </div>
    </header>
  );
};
