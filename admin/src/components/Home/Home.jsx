import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col gap-16">
        <div>
          <img
            src="/images/Admin-Logo.svg"
            className="w-[50rem]"
            alt="admin-logo"
          />
        </div>
        <div className="flex items-center justify-center gap-16">
          <Link to="/admin-signin">
            <button className="px-10 py-4 bg-flex-furniture-600 text-3xl text-white font-semibold tracking-wide rounded-xl hover:bg-flex-furniture-500 transition-all duration-300">Signin</button>
          </Link>
          <Link to="/admin-signup">
            <button className="px-10 py-4 bg-flex-furniture-600 text-3xl text-white font-semibold tracking-wide rounded-xl hover:bg-flex-furniture-500 transition-all duration-300">Signup</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
