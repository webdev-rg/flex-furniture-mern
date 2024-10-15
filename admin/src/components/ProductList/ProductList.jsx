import React, { useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleGetProducts = async () => {
    try {
      const response = await fetch(
        "https://flex-furniture-server.onrender.com/api/getproducts"
      );
      const data = await response.json();

      if (data.message === "Failed to fetch products") {
        alert(`${data.message}`);
      } else if (data.message === "Products") {
        setProducts(data.productData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <div className="w-full h-full p-10 flex flex-col gap-10">
      <div>
        <h1 className="text-4xl font-bold text-flex-furniture-950">
          Product List
        </h1>
      </div>
      <div className="w-full flex flex-col gap-10">
        {loading ? (
          <Loading />
        ) : (
          products.length > 0 &&
          products.map((product) => {
            return (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                discount={product.discount}
                rating={product.rating}
                stock={product.stock}
                category={product.category}
                images={product.images}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

const ProductCard = ({
  id,
  name,
  price,
  discount,
  rating,
  stock,
  category,
  images,
}) => {
  const handleDeleteProduct = async (productId) => {
    console.log(productId)
    try {
      const response = await fetch(
        `https://flex-furniture-server.onrender.com/api/deleteproduct/${productId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      console.log(data);

      if (
        data.message === "Product not found" ||
        data.message === "Error deleting product"
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
      } else if (data.message === "Product deleted successfully") {
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
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full p-6 border border-slate-200 rounded-2xl">
        <div className="flex flex-col gap-10">
          <h1 className="text-2xl text-flex-furniture-950 font-semibold tracking-wide">
            Images
          </h1>
          <div className="flex items-center gap-5">
            {images.map((image, index) => {
              return (
                <div className="w-40 h-48" key={index}>
                  <img
                    src={image}
                    className="w-full h-full object-cover rounded-2xl"
                    alt=""
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full">
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left rtl:text-right text-flex-furniture-950">
                <thead className="text-xs text-flex-furniture-950 uppercase bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-2xl">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3 text-2xl">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3 text-2xl">
                      Discount
                    </th>
                    <th scope="col" className="px-6 py-3 text-2xl">
                      Rating
                    </th>
                    <th scope="col" className="px-6 py-3 text-2xl">
                      Stock
                    </th>
                    <th scope="col" className="px-6 py-3 text-2xl">
                      Category
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b text-2xl text-flex-furniture-950">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {name}
                    </th>
                    <td className="px-6 py-4">${price}</td>
                    <td className="px-6 py-4">{discount}%</td>
                    <td className="px-6 py-4">{rating}</td>
                    <td className="px-6 py-4">{stock}</td>
                    <td className="px-6 py-4">{category}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-full flex items-center gap-5">
            <button className="px-8 py-3 bg-green-600 rounded-xl text-2xl text-white font-semibold tracking-wide">
              Update
            </button>
            <button
              className="px-8 py-3 bg-red-600 rounded-xl text-2xl text-white font-semibold tracking-wide"
              onClick={() => handleDeleteProduct(id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
