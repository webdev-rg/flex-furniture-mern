import React, { useContext, useEffect, useState } from "react";
import { Data } from "../DataProvider/DataProvider";
import { GoTrash } from "react-icons/go";
import { Loading } from "../Loading/Loading";

export const OrderList = () => {
  const { userData, URL } = useContext(Data);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    if (orders.length > 0) {
      setQuantity(orders.map((item) => item.productQuantity));
    }
  }, [orders]);

  const handleGetOrders = async () => {
    try {
      const response = await fetch(
        `http://localhost:1901/api/getuserorder/${userData._id}`
      );

      const data = await response.json();
      setOrders(data.orders);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetOrders();
  }, []);

  return (
    <div className="w-full h-full p-10 flex flex-col gap-10">
      <div className="w-full">
        <h1 className="text-4xl text-flex-furniture-950 font-semibold tracking-wide leading-relaxed">
          My Orders ({orders.length})
        </h1>
      </div>
      <div className="w-full h-full">
        {orders.length > 0 ? (
          <div className="w-full h-full overflow-y-auto">
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
                    Action
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
                  orders.map((item, index) => {
                    return (
                      <tr key={item._id} className="bg-white text-2xl">
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
                          {quantity[index]}
                        </td>
                        <td className="px-6 py-4 text-center">
                          ${(item.productPrice * quantity[index]).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button className="px-6 py-4 text-red-600 border border-red-600 rounded-xl hover:bg-red-600 hover:text-white translate-x-0 duration-200 ease-in-out">
                            Cancel Order
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <h1 className="text-3xl text-flex-furniture-950 font-semibold">
              No Orders
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};
