import React from "react";
import { GoHeart } from "react-icons/go";

export const ProductCard = ({ name, price, discount, image }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full relative">
        <img src={image} alt="product-image" />
        <div className="absolute bottom-4 right-4 bg-white w-16 h-16 flex items-center justify-center rounded-full drop-shadow-xl drop-shadow-slate-300 hover:bg-flex-furniture-500 hover:text-white transition-all duration-300 ease-in-out cursor-pointer">
          <GoHeart className="text-4xl" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-2xl font-semibold tracking-wide">{name}</h1>
        <h2 className="text-2xl font-bold tracking-wide flex items-center gap-5">
          ${price}{" "}
          <span className="font-medium text-red-600">-{discount}%</span>
        </h2>
      </div>
    </div>
  );
};
