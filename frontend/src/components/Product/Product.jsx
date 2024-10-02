import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { RiFacebookLine, RiTwitterLine, RiInstagramLine } from "react-icons/ri";

export const Product = () => {
  return (
    <>
      <div className="w-full pt-40 px-32">
        <div className="w-full flex justify-between py-20">
          <div className="w-[55%] flex justify-between gap-5">
            <div className="w-[16%] flex flex-col gap-5">
              <div className="w-full h-48">
                <img
                  src="/images/chair.jpg"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="w-full h-48">
                <img
                  src="/images/chair.jpg"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="w-full h-48">
                <img
                  src="/images/chair.jpg"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
              <div className="w-full h-48">
                <img
                  src="/images/chair.jpg"
                  className="w-full h-full object-cover"
                  alt=""
                />
              </div>
            </div>
            <div className="w-full">
              <img src="/images/chair.jpg" className="w-full" alt="" />
            </div>
          </div>
          <div className="w-[45%] h-full px-20">
            <div className="w-full h-full flex flex-col gap-10 pb-10 border-b">
              <h1 className="text-5xl font-medium">
                Wood Outdoor Adirondack Chair
              </h1>
              <div className="w-full flex items-center gap-20">
                <div className="flex items-center gap-3">
                  <FaStar className="text-3xl text-yellow-300" />
                  <FaStar className="text-3xl text-yellow-300" />
                  <FaStar className="text-3xl text-yellow-300" />
                  <FaStar className="text-3xl text-yellow-300" />
                  <FaStarHalfAlt className="text-3xl text-yellow-300" />
                  <span className="text-3xl font-medium">(4.5)</span>
                </div>
                <div>
                  <h2 className="text-[1.8rem] font-semibold">
                    Stock:{" "}
                    <span className="font-medium text-green-500">In Stock</span>
                  </h2>
                </div>
              </div>
              <h1 className="text-6xl tracking-wide">
                $1009 <span className="text-4xl text-red-600">-15%</span>
              </h1>
              <p className="text-2xl leading-relaxed text-[#848484]">
                Aliquam condimentum dictum gravida. Sed eu odio id lorem
                fermentum faucibus. Cras tempor semper ligula.
              </p>
              <div className="w-full flex items-center gap-10">
                <div className="flex items-center">
                  <button className="w-20 h-20 bg-[#efefef] text-3xl flex items-center justify-center">
                    <LuMinus />
                  </button>
                  <button className="w-20 h-20 bg-[#efefef] text-3xl">1</button>
                  <button className="w-20 h-20 bg-[#efefef] text-3xl flex items-center justify-center">
                    <GoPlus />
                  </button>
                </div>
                <div className="w-full">
                  <button className="w-full h-20 bg-flex-furniture-950 text-white text-2xl font-semibold tracking-wide">
                    ADD TO CART
                  </button>
                </div>
              </div>
              <div className="w-full">
                <button className="w-full h-20 border border-flex-furniture-950 text-3xl font-bold tracking-wide hover:border-flex-furniture-600 hover:text-flex-furniture-600 transition-all duration-300">
                  BUY NOW
                </button>
              </div>
              <div className="w-full flex items-center justify-between">
                <div>
                  <h1 className="flex items-center gap-3 text-2xl">
                    <GoHeart /> Add to wishlist
                  </h1>
                </div>
                <div className="flex items-center gap-5">
                  <RiFacebookLine className="text-3xl" />
                  <RiInstagramLine className="text-3xl" />
                  <RiTwitterLine className="text-3xl" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 py-10">
              <h2 className="text-2xl font-semibold">SKU: <span className="font-normal text-[#848484]">0093</span></h2>
              <h2 className="text-2xl font-semibold">Brands: <span className="font-normal text-[#848484]">Creative Design</span></h2>
              <h2 className="text-2xl font-semibold">Tags: <span className="font-bold text-[#848484]">Furniture, Trending, Wood</span></h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
