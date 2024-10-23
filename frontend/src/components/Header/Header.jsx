import React, { useContext, useState } from "react";
import logo from "/images/Logo.svg";
import { Link, NavLink } from "react-router-dom";
import { CiSearch, CiUser, CiShoppingCart, CiMenuBurger } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { Loading } from "../Loading/Loading";
import { Data } from "../DataProvider/DataProvider";

export const Header = ({ isUserLoggedIn, cartDetails }) => {
  const { URL } = useContext(Data);
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isNavbar, setIsNavbar] = useState(false);

  const handleOpenSearchBar = () => {
    setOpenSearchBar(true);
  };
  const handleCloseSearchBar = () => {
    setOpenSearchBar(false);
    setProducts([]);
    setHasSearched(false);
    setSearchTerm("");
  };

  const handleSearchProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);
    try {
      const response = await fetch(`${URL}/api/searchproduct`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ searchTerm }),
      });
      const data = await response.json();

      if (data.message === "No product found") {
        setProducts([]);
        setLoading(false);
      } else if (data.message === "Products found") {
        setProducts(data.searchProduct);
        setLoading(false);
        setSearchTerm("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <header className="w-full h-32 border fixed top-0 left-0 lg:px-32 px-5 bg-white flex items-center justify-between z-20">
        <div className="h-full flex items-center sm:gap-10 gap-5">
          <div className="">
            <CiMenuBurger
              className="text-4xl text-[#020d19] hover:text-slate-400 transition-all duration-300 cursor-pointer"
              onClick={() => setIsNavbar(true)}
            />
          </div>
          <div className="h-full flex items-center">
            <Link to="/">
              <img className="sm:w-80 w-60" src={logo} alt="logo" />
            </Link>
          </div>
        </div>

        <div className="h-full flex items-center gap-10">
          <div>
            <CiSearch
              className="text-4xl text-flex-furniture-950 hover:text-gray-400 transition-all duration-300 cursor-pointer"
              onClick={handleOpenSearchBar}
            />
          </div>
          <div className="relative">
            <Link
              to={`${
                isUserLoggedIn === false ? "/signin" : "/dashboard/myprofile"
              }`}
            >
              <CiUser className="text-4xl text-flex-furniture-950 hover:text-gray-400 transition-all duration-300 cursor-pointer" />
            </Link>
          </div>
          <div className="relative">
            <Link to="/cart">
              <CiShoppingCart className="text-4xl text-flex-furniture-950 hover:text-gray-400 transition-all duration-300 cursor-pointer" />
              <div className="absolute -top-3 -right-4 w-7 h-7 flex items-center justify-center bg-flex-furniture-950 rounded-full">
                <span className="text-xl text-white">
                  {isUserLoggedIn ? cartDetails.length : 0}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </header>

      <nav
        className={`fixed top-0 ${
          isNavbar ? "left-0" : "-left-full"
        } lg:w-1/4 md:w-1/3 sm:w-1/2 w-[90%] h-screen flex flex-col gap-12 border-r border-r-slate-200 bg-white z-20 p-12 transition-all duration-500 ease-in-out`}
      >
        <div className="w-full flex justify-between">
          <div>
            <img src={logo} className="w-80" alt="logo" />
          </div>
          <div>
            <i
              className="fi fi-rr-cross text-2xl cursor-pointer"
              onClick={() => setIsNavbar(false)}
            ></i>
          </div>
        </div>
        <ul className="w-full flex flex-col gap-4">
          <li className="w-full">
            <NavLink
              to="/"
              className="inline-block w-full text-3xl px-8 py-4 text-gray-400 hover:text-flex-furniture-950 transition-all duration-300 tracking-wider relative before:absolute before:content-[''] before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-flex-furniture-950 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out"
              onClick={() => setIsNavbar(false)}
            >
              Home
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to={`/shop/product-category/allproducts`}
              className="inline-block w-full text-3xl px-8 py-4 text-gray-400 hover:text-flex-furniture-950 transition-all duration-300 tracking-wider relative before:absolute before:content-[''] before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-flex-furniture-950 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out"
              onClick={() => setIsNavbar(false)}
            >
              Shop
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to="/about"
              className="inline-block w-full text-3xl px-8 py-4 text-gray-400 hover:text-flex-furniture-950 transition-all duration-300 tracking-wider relative before:absolute before:content-[''] before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-flex-furniture-950 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out"
              onClick={() => setIsNavbar(false)}
            >
              AboutUs
            </NavLink>
          </li>
          <li className="w-full">
            <NavLink
              to="contact"
              className="inline-block w-full text-3xl px-8 py-4 text-gray-400 hover:text-flex-furniture-950 transition-all duration-300 tracking-wider relative before:absolute before:content-[''] before:bottom-0 before:left-0 before:w-0 before:h-[1px] before:bg-flex-furniture-950 hover:before:w-full before:transition-all before:duration-300 before:ease-in-out"
              onClick={() => setIsNavbar(false)}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      <div
        className={`lg:w-1/4 md:w-2/5 sm:w-1/2 w-[90%] h-screen flex flex-col gap-10 fixed bg-white border border-l-[1px] transition-all duration-300 ease-in-out z-20 ${
          openSearchBar
            ? "right-0"
            : "lg:-right-1/4 md:-right-2/5 sm:-right-1/2 -right-full"
        }`}
      >
        <div className="w-full px-10 pt-10 flex items-center justify-between">
          <h2 className="text-2xl text-[#020d19]">
            Search for products ({products.length})
          </h2>
          <IoIosClose
            className="text-6xl text-[#020d19] cursor-pointer"
            onClick={handleCloseSearchBar}
          />
        </div>
        <div className="w-full px-10">
          <div className="relative">
            <form className="w-full" onSubmit={handleSearchProduct}>
              <input
                type="text"
                placeholder="Enter product name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-20 px-5 border rounded-xl text-2xl text-[#020d19] font-medium placeholder:font-light focus:border-[#020d19]"
              />
              <CiSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-3xl" />
            </form>
          </div>
        </div>
        <div className="flex flex-col gap-8 overflow-y-auto">
          {loading ? (
            <Loading />
          ) : products.length > 0 ? (
            products.map((item) => (
              <div key={item._id} className="w-full h-full px-10 flex gap-5 ">
                <div className="w-48">
                  <img
                    src={item.images[0]}
                    className="w-full object-cover"
                    alt="product-image"
                  />
                </div>
                <div className="w-full flex flex-col gap-3">
                  <h1 className="text-2xl text-flex-furniture-950 font-medium tracking-wider">
                    <Link
                      to={`/shop/product/${
                        item.name
                      }/category/${item.category.toLowerCase()}/${item._id}`}
                      onClick={handleCloseSearchBar}
                      className="hover:text-flex-furniture-600 transition-all duration-200 ease-in-out"
                    >
                      {item.name}
                    </Link>
                  </h1>
                  <h2 className="text-3xl text-flex-furniture-950 font-medium">
                    ${item.price}{" "}
                    <span className="text-red-600 font-normal">
                      -{item.discount}%
                    </span>
                  </h2>
                  <div className="flex items-center gap-3">
                    <FaStar className="text-2xl text-flex-furniture-950" />
                    <FaStar className="text-2xl text-flex-furniture-950" />
                    <FaStar className="text-2xl text-flex-furniture-950" />
                    <FaStar className="text-2xl text-flex-furniture-950" />
                    <FaStarHalfAlt className="text-2xl text-flex-furniture-950" />
                    <span className="text-2xl text-flex-furniture-950 font-medium">
                      ({item.rating})
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : hasSearched && products.length === 0 ? (
            <div className="w-full px-10">
              <h1 className="text-2xl text-flex-furniture-950 font-semibold">
                No products found
              </h1>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};
