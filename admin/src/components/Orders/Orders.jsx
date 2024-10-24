import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Data } from "../../../../frontend/src/components/DataProvider/DataProvider";

export const Orders = () => {
  const { URL } = useContext(Data);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetAllOrders = async () => {
    try {
      const response = await fetch(`http://localhost:1901/api/getallorders`);
      const data = await response.json();
      if (data.message === "Internal server error") {
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
      } else if (data.message === "orders") {
        setOrders(data.orders);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetAllOrders();
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="w-full h-full p-10 flex flex-col gap-10">
        <div className="w-full">
          <h1 className="text-4xl text-flex-furniture-950 font-semibold tracking-wide">
            Orders
          </h1>
        </div>
        <div className="w-full h-full">
          <div className="relative overflow-x-auto overflow-y-hidden sm:rounded-lg"></div>
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
                <th scope="col" className="px-6 py-3 text-2xl text-center">
                  Ordered By
                </th>
                <th scope="col" className="px-6 py-3 text-2xl text-center">
                  User Id
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
                orders.map((item) => {
                  return (
                    <tr
                      key={item._id}
                      className="bg-white border-b border-b-slate-200 text-2xl"
                    >
                      <th
                        scope="row"
                        className="py-4 font-medium text-gray-900 whitespace-nowrap text-left"
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
                        {item.productQuantity}
                      </td>
                      <td className="px-6 py-4 text-center">
                        ${item.totalPrice}
                      </td>
                      <td className="px-6 py-4 text-center">{item.userName}</td>
                      <td className="px-6 py-4 text-center">{item.userId}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
