import React from "react";

export const ProductCard = ({ name, price, discount, image }) => {
  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full h-[40rem]">
        <img src={image} className="w-full h-full object-cover" alt="product-image" />
      </div>
      <div className="w-full flex flex-col gap-5">
        <h1 className="text-2xl text-flex-furniture-950 font-semibold tracking-wide hover:text-flex-furniture-600 transition-all duration-200 ease-in-outF">
          {name}
        </h1>
        <h2 className="text-2xl font-bold tracking-wide flex items-center gap-5">
          ${price}{" "}
          <span className="font-medium text-red-600">-{discount}%</span>
        </h2>
      </div>
    </div>
  );
};
