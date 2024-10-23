import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";
import { Data } from "../DataProvider/DataProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Checkout = () => {
  const { cartDetails, loading, userData, handleGetCartDetails, URL } =
    useContext(Data);

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    if (userData._id) {
      handleGetCartDetails(userData._id);
    }
  }, [userData._id]);

  useEffect(() => {
    if (cartDetails.length > 0) {
      setQuantity(cartDetails.map((item) => item.productQuantity));
    }
  }, [cartDetails]);

  const total = cartDetails.reduce((acc, item, index) => {
    return acc + item.productPrice * quantity[index];
  }, 0);

  const handleCreateOrder = async () => {
    const orderItems = cartDetails.map((item, index) => ({
      productName: item.productName,
      productPrice: item.productPrice,
      productQuantity: quantity[index],
      productImage: item.productImage,
      userId: userData._id,
      userName: `${userData.firstName} ${userData.lastName}`,
      userAddress: userData.address,
    }));

    try {
      const response = await fetch(`http://localhost:1901/api/placeorder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orders: orderItems }),
      });

      const data = await response.json();
      console.log(data);
      if (data.message === "Your orders have been placed") {
        toast.success("Order placed successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else if (data.message === "Internal server error") {
        toast.error("Failed to place order.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full h-full py-40 lg:px-32 px-5">
        <div className="w-full text-center py-8">
          <h1 className="text-6xl text-flex-furniture-950 font-semibold tracking-wide">
            Checkout
          </h1>
        </div>
        <div className="w-full h-full flex md:flex-row flex-col justify-between gap-12">
          <div className="md:w-[75%] w-full h-full">
            <div className="relative overflow-x-auto overflow-y-hidden sm:rounded-lg">
              <table className="w-full text-flex-furniture-950">
                <thead className="text-flex-furniture-950 bg-gray-100 text-left">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-2xl">
                      Product
                    </th>
                    <th scope="col" className="px-6 py-3 text-2xl text-center">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-2xl text-center">
                      Quantity
                    </th>
                    <th scope="col" className="px-6 py-3 text-2xl text-center">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={5}>
                        <Loading />
                      </td>
                    </tr>
                  ) : (
                    cartDetails.map((item, index) => {
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
                          <td className="px-6 py-4 text-center">
                            ${item.productPrice}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {quantity[index]}
                          </td>
                          <td className="px-6 py-4 text-center">
                            ${(item.productPrice * quantity[index]).toFixed(2)}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="md:w-[25%] w-full h-full bg-gray-100 p-8">
            <h1 className="text-3xl text-flex-furniture-950 font-semibold tracking-wide">
              CART TOTALS
            </h1>
            <div className="w-full flex justify-between py-8 border-b border-slate-300">
              <h1 className="text-3xl text-flex-furniture-950 font-semibold">
                Subtotal
              </h1>
              <h1 className="text-3xl text-flex-furniture-950 font-semibold">
                ${total.toFixed(2)}
              </h1>
            </div>
            <div className="py-8 flex flex-col gap-5 border-b border-slate-300">
              <h1 className="text-3xl text-flex-furniture-950 font-semibold">
                Shipping
              </h1>
              <p className="text-xl text-flex-furniture-950 font-medium tracking-wide leading-relaxed">
                {userData.address ? userData.address : "No Address"}
              </p>
            </div>
            <div className="w-full flex justify-between py-8">
              <h1 className="text-3xl text-flex-furniture-950 font-semibold">
                Total
              </h1>
              <h1 className="text-3xl text-flex-furniture-950 font-semibold">
                ${total.toFixed(2)}
              </h1>
            </div>
            <div className="w-full">
              <h1 className="text-3xl text-flex-furniture-950 font-semibold">
                Payment
              </h1>
              <p className="text-2xl text-flex-furniture-950 font-medium mt-4">
                Cash on delivery
              </p>
            </div>
            <div className="py-8">
              <button
                className="w-full py-5 text-2xl text-white font-semibold bg-flex-furniture-950"
                onClick={handleCreateOrder}
              >
                PLACE ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
