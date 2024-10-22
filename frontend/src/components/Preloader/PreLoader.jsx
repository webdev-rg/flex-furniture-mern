import React from "react";
import logo from "/images/Logo.svg";

const Preloader = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div
          className={`fixed top-0 left-0 w-full h-full bg-white z-50 flex items-center justify-center transition-opacity duration-300 ${
            !isLoading ? "opacity-0 invisible" : "opacity-100 visible"
          }`}
        >
          <div className="relative w-[40rem]">
            <img src={logo} alt="preloader" className="w-full" />
            <div className="absolute inset-0 bg-white animate-slideToRight"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Preloader;
