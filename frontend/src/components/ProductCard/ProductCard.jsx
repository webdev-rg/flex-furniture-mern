import React from "react";
import chair from "/images/chair.jpg";
import { GoHeart } from "react-icons/go";

export const ProductCard = () => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full relative">
        <img src={chair} alt="product-image" />
        <div className="absolute bottom-4 right-4 bg-white w-16 h-16 flex items-center justify-center rounded-full drop-shadow-xl drop-shadow-slate-300 hover:bg-flex-furniture-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          <GoHeart className="text-4xl" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-2xl font-semibold tracking-wide">
          Wood Outdoor Adirondack Chair
        </h1>
        <h2 className="text-2xl font-bold tracking-wide flex items-center gap-5">
          $1,009 <span className="font-medium text-red-600">-15%</span>
        </h2>
      </div>
    </div>
  );
};
