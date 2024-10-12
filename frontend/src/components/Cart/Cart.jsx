import React, { useContext } from "react";
import { GoPlus, GoTrash } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { Data } from "../DataProvider/DataProvider";
import { Loading } from "../Loading/Loading";
import chair from "/images/chair.jpg";

export const Cart = () => {
  const { cartDetails, loading } = useContext(Data);
  if (cartDetails) {
    console.log("Cart Details:", cartDetails);
  }
  return (
    <div className="w-full h-full py-40 px-32 flex flex-col gap-10">
      <div className="w-full py-8 text-center">
        <h1 className="text-5xl text-flex-furniture-950 font-bold tracking-widest">
          Shopping Cart
        </h1>
      </div>

      <div className="w-full flex justify-between gap-16">
        <div className="w-[70%] h-full">
          <div className="relative overflow-x-auto overflow-y-hidden sm:rounded-lg">
            <table className="w-full text-flex-furniture-950">
              <thead className="text-flex-furniture-950 bg-gray-100 text-left">
                <tr>
                  <th scope="col" className="px-6 py-3 text-2xl">
                    Product Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-2xl">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-2xl">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3 text-2xl">
                    Subtotal
                  </th>
                  <th scope="col" className="px-6 py-3 text-2xl">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <div className="w-full flex justify-center">
                    <Loading />
                  </div>
                ) : (
                  cartDetails.length > 0 &&
                  cartDetails.map((item) => {
                    console.log(item.productImage);
                    return (
                      <tr
                        key={item._id}
                        className="bg-white border-b border-b-slate-200 text-2xl"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap text-left"
                        >
                          <div className="flex items-center gap-8">
                            <div className="w-40 h-40">
                              <img
                                src={item.productImage}
                                className="w-full h-full object-cover"
                                alt="product-image"
                              />
                            </div>
                            <div>
                              <h1>{item.productName}</h1>
                            </div>
                          </div>
                        </th>
                        <td className="px-6 py-4">${item.productPrice}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button
                              className="w-10 h-10 bg-[#efefef] text-xl flex items-center justify-center"
                              // onClick={handleDecreaseQuantity}
                            >
                              <LuMinus />
                            </button>
                            <button className="w-10 h-10 bg-[#efefef] text-xl">
                              {item.productQuantity}
                            </button>
                            <button
                              className="w-10 h-10 bg-[#efefef] text-xl flex items-center justify-center"
                              // onClick={handleIncreaseQuanity}
                            >
                              <GoPlus />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4">${item.totalPrice}</td>
                        <td className="px-6 py-4 text-center">
                          <GoTrash className="text-3xl" />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-[30%] h-full bg-gray-100 p-8">
          <h1 className="text-3xl text-flex-furniture-950 font-semibold tracking-wide">
            CART TOTALS
          </h1>
          <div className="w-full flex justify-between py-8 border-b border-slate-300">
            <h1 className="text-3xl text-flex-furniture-950 font-semibold">
              Subtotal
            </h1>
            <h1 className="text-3xl text-flex-furniture-950 font-semibold">
              $2999
            </h1>
          </div>
          <div className="py-8 flex flex-col gap-5 border-b border-slate-300">
            <h1 className="text-3xl text-flex-furniture-950 font-semibold">
              Shipping
            </h1>
            <p className="text-xl text-flex-furniture-950 font-medium tracking-wide leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
              aperiam veritatis eum sed beatae. Quam maiores nostrum dolorem ab
              facilis.
            </p>
          </div>
          <div className="w-full flex justify-between py-8">
            <h1 className="text-3xl text-flex-furniture-950 font-semibold">
              Total
            </h1>
            <h1 className="text-3xl text-flex-furniture-950 font-semibold">
              $2999
            </h1>
          </div>
          <div className="py-8">
            <button className="w-full py-5 text-2xl text-white font-semibold bg-flex-furniture-950">
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
