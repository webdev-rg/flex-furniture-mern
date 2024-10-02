import React, { useState } from "react";
import logo from "/images/Logo.svg";
import { Link, NavLink } from "react-router-dom";
import {
  CiSearch,
  CiUser,
  CiHeart,
  CiShoppingCart,
  CiMenuBurger,
} from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

export const Header = () => {
  const [openSearchBar, setOpenSearchBar] = useState(false);

  const handleOpenSearchBar = () => {
    setOpenSearchBar(true);
  };
  const handleCloseSearchBar = () => {
    setOpenSearchBar(false);
  };

  return (
    <>
      <header className="w-full h-32 border fixed top-0 left-0 lg:px-32 px-5 bg-white flex items-center justify-between z-20">
        <div className="h-full flex items-center gap-10">
          <div className="block md:hidden">
            <CiMenuBurger className="text-4xl text-[#020d19] hover:text-slate-400 transition-all duration-300 cursor-pointer" />
          </div>
          <div className="h-full flex items-center">
            <Link to="/">
              <img className="w-80" src={logo} alt="logo" />
            </Link>
          </div>
        </div>

        <nav className="h-full flex items-center">
          <ul className="h-full flex items-center gap-10">
            <li className="text-2xl px-3 py-1 text-[#666] hover:text-flex-furniture-950 transition-all duration-300 tracking-wider relative before:absolute before:content-[''] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[1px] before:bg-flex-furniture-950 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out">
              <NavLink to="/">Home</NavLink>
            </li>
            <li className="text-2xl px-3 py-1 text-[#666] hover:text-flex-furniture-950 transition-all duration-300 tracking-wider relative before:absolute before:content-[''] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[1px] before:bg-flex-furniture-950 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out">
              <NavLink to={`/shop/product-category/allproducts`}>Shop</NavLink>
            </li>
            <li className="text-2xl px-3 py-1 text-[#666] hover:text-flex-furniture-950 transition-all duration-300 tracking-wider relative before:absolute before:content-[''] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[1px] before:bg-flex-furniture-950 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out">
              <NavLink to="/about">AboutUs</NavLink>
            </li>
            <li className="text-2xl px-3 py-1 text-[#666] hover:text-flex-furniture-950 transition-all duration-300 tracking-wider relative before:absolute before:content-[''] before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-[1px] before:bg-flex-furniture-950 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out">
              <NavLink to="contact">Contact</NavLink>
            </li>
          </ul>
        </nav>

        <div className="h-full flex items-center gap-10">
          <div>
            <CiSearch
              className="text-4xl text-[#020d19] hover:text-slate-400 transition-all duration-300 cursor-pointer"
              onClick={handleOpenSearchBar}
            />
          </div>
          <div className="relative">
            <Link to="/signin">
              <CiUser className="text-4xl text-[#020d19] hover:text-slate-400 transition-all duration-300 cursor-pointer" />
            </Link>
          </div>
          <div className="relative">
            <CiHeart className="text-4xl text-[#020d19] hover:text-slate-400 transition-all duration-300 cursor-pointer" />
            <div className="absolute -top-3 -right-4 w-7 h-7 flex items-center justify-center bg-[#020d19] rounded-full">
              <span className="text-xl text-white">0</span>
            </div>
          </div>
          <div className="relative">
            <CiShoppingCart className="text-4xl text-[#020d19] hover:text-slate-400 transition-all duration-300 cursor-pointer" />
            <div className="absolute -top-3 -right-4 w-7 h-7 flex items-center justify-center bg-[#020d19] rounded-full">
              <span className="text-xl text-white">0</span>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`lg:w-1/4 md:w-2/5 sm:w-1/2 w-full h-screen fixed bg-white border border-l-[1px] transition-all duration-300 ease-in-out z-20 ${
          openSearchBar ? "right-0" : "lg:-right-1/4 md:-right-2/5 sm:-right-1/2 -right-full"
        }`}
      >
        <div className="w-full px-10 py-10 flex items-center justify-between">
          <h2 className="text-2xl text-[#020d19]">Search for products</h2>
          <IoIosClose
            className="text-6xl text-[#020d19] cursor-pointer"
            onClick={handleCloseSearchBar}
          />
        </div>
        <div className="w-full px-10 pb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter product name"
              className="w-full h-20 px-5 border rounded-xl text-2xl text-[#020d19] font-medium placeholder:font-light focus:border-[#020d19]"
            />
            <CiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-3xl" />
          </div>
        </div>
      </div>
    </>
  );
};
