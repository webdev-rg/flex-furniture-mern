import React, { useContext, useState, useEffect } from "react";
import { GoPlus, GoTrash } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { Data } from "../DataProvider/DataProvider";
import { Loading } from "../Loading/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cartDetails, loading, setLoading, userData, handleGetCartDetails, URL } =
    useContext(Data);
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

  const handleIncreaseQuantity = (index) => {
    const newQuantity = [...quantity];
    newQuantity[index] += 1;
    setQuantity(newQuantity);
  };

  const handleDecreaseQuantity = (index) => {
    const newQuantity = [...quantity];
    if (newQuantity[index] > 1) {
      newQuantity[index] -= 1;
    }
    setQuantity(newQuantity);
  };

  const total = cartDetails.reduce((acc, item, index) => {
    return acc + item.productPrice * quantity[index];
  }, 0);

  const handleUpdateCart = async () => {
    try {
      const updatedCartItems = cartDetails.map((item, index) => ({
        productId: item._id,
        productQuantity: quantity[index],
        totalPrice: item.productPrice * quantity[index],
      }));
      console.log(updatedCartItems);

      const response = await fetch(`${URL}/api/updatecart/${userData._id}`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ cartItems: updatedCartItems }),
      });

      const data = await response.json();
      console.log(data);

      if (
        data.message === "Cart item not found" ||
        data.message === "Error updating cart"
      ) {
        return toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (data.message === "Your Cart updated successfully") {
        toast.success(`${data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleGetCartDetails(userData._id);
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelDeleteCartItem = async (cartId) => {
    console.log(cartId);

    try {
      const response = await fetch(`${URL}/api/deletecartitem/${cartId}`, {
        method: "DELETE",
      });

      const data = await response.json();
      console.log(data.cartItem);

      if (
        data.message === "Cart item not found" ||
        data.message === "Error deleting cart item"
      ) {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      } 
      if (data.message === "One item deleted") {
        toast.success(`${data.cartItem.productName} removed from your cart`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleGetCartDetails(userData._id);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full h-full py-40 px-32 flex flex-col gap-10">
        <div className="w-full py-8 text-center">
          <h1 className="text-5xl text-flex-furniture-950 font-bold tracking-widest">
            Shopping Cart
          </h1>
        </div>

        {cartDetails.length > 0 ? (
          <div className="w-full flex justify-between gap-16">
            <div className="w-[70%] h-full flex flex-col gap-10">
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
                            <td className="px-6 py-4">${item.productPrice}</td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                <button
                                  className="w-10 h-10 bg-[#efefef] text-xl flex items-center justify-center"
                                  onClick={() => handleDecreaseQuantity(index)}
                                >
                                  <LuMinus />
                                </button>
                                <button className="w-10 h-10 bg-[#efefef] text-xl">
                                  {quantity[index]}
                                </button>
                                <button
                                  className="w-10 h-10 bg-[#efefef] text-xl flex items-center justify-center"
                                  onClick={() => handleIncreaseQuantity(index)}
                                >
                                  <GoPlus />
                                </button>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              $
                              {(item.productPrice * quantity[index]).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 text-center">
                              <GoTrash
                                className="text-3xl text-red-600 cursor-pointer"
                                onClick={() => handelDeleteCartItem(item._id)}
                              />
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
              <div className="text-right">
                <button
                  className="px-10 py-3 text-2xl text-flex-furniture-950 font-semibold border border-flex-furniture-950 rounded-2xl hover:bg-flex-furniture-950 hover:text-white transition-all duration-200 ease-in-out"
                  onClick={handleUpdateCart}
                >
                  Update
                </button>
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
              <div className="py-8">
                <button className="w-full py-5 text-2xl text-white font-semibold bg-flex-furniture-950">
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full flex flex-col items-center gap-8">
            <div>
              <img
                src="/images/cart-empty.svg"
                alt="cart-empty"
                className="w-64 opacity-40"
              />
            </div>
            <p className="text-3xl text-flex-furniture-950 font-light">
              Your cart is currently empty
            </p>
            <Link
              to="/shop/product-category/allproducts"
              className="text-2xl text-white font-semibold px-16 py-6 bg-flex-furniture-950"
            >
              RETURN TO SHOP
            </Link>
          </div>
        )}
      </div>
    </>
  );
};
