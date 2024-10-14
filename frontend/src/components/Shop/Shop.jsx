import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Category } from "../Category/Category";
import { ProductCard } from "../ProductCard/ProductCard";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";
import { Data } from "../DataProvider/DataProvider";
import { Loading } from "../Loading/Loading";

export const Shop = () => {
  const { products, setProducts, loading, setLoading, URL, handleGetProducts } =
    useContext(Data);
  const { category } = useParams();

  const handleGetProductByCategory = async () => {
    try {
      const response = await fetch(
        `${URL}/productbycategory/${category}`
      );

      const data = await response.json();
      setProducts(data.product);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (category === "allproducts") {
      setLoading(true);
      handleGetProducts();
    } else {
      setProducts([]);
      setLoading(true);
      handleGetProductByCategory();
    }
  }, [category]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      {/* Scroll To Top */}
      <div className="fixed right-0 bottom-0">
        <ScrollToTop />
      </div>
      <div className="w-full h-full">
        <div className="w-full h-full px-32 pt-40 pb-20">
          <div className="flex flex-col gap-14 py-16 border-b">
            <h1 className="text-center text-7xl font-bold tracking-wider">
              {category === "allproducts"
                ? "Shop"
                : category === "Chair"
                ? "Chair"
                : category === "Lamp"
                ? "Lamp"
                : category === "Sofa"
                ? "Sofa"
                : category === "Bed"
                ? "Bed"
                : category === "Table"
                ? "Table"
                : ""}
            </h1>
            <div className="py-20">
              <Category
                prevButton=".swiper-button-prev-category"
                nextButton=".swiper-button-next-category"
                slides={3}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full px-32 pb-20">
        <div className="w-full h-full flex justify-between gap-10">
          <div className="w-[25%] h-full">
            <div className="w-full bg-[#efefef] px-10 py-6">
              <h1 className="text-3xl font-semibold tracking-wide">PRICE</h1>
            </div>
            <ul className="w-full px-10 py-6 flex flex-col gap-7">
              <li className="w-full flex items-center gap-5">
                <input
                  type="radio"
                  name="price-filter"
                  id="$500 & Under"
                  className="w-7 h-7 accent-flex-furniture-700"
                />
                <label htmlFor="$500 & Under" className="text-2xl font-medium">
                  $500 & Under
                </label>
              </li>
              <li className="w-full flex items-center gap-5">
                <input
                  type="radio"
                  name="price-filter"
                  id="$500 & $999"
                  className="w-7 h-7 accent-flex-furniture-700"
                />
                <label htmlFor="$500 & $999" className="text-2xl font-medium">
                  $500 & $999
                </label>
              </li>
              <li className="w-full flex items-center gap-5">
                <input
                  type="radio"
                  name="price-filter"
                  id="$1000 & $1,999"
                  className="w-7 h-7 accent-flex-furniture-700"
                />
                <label
                  htmlFor="$1000 & $1,999"
                  className="text-2xl font-medium"
                >
                  $1000 & $1,999
                </label>
              </li>
              <li className="w-full flex items-center gap-5">
                <input
                  type="radio"
                  name="price-filter"
                  id="$2000 & $5000"
                  className="w-7 h-7 accent-flex-furniture-700"
                />
                <label htmlFor="$2000 & $5000" className="text-2xl font-medium">
                  $2000 & $5000
                </label>
              </li>
              <li className="w-full flex items-center gap-5">
                <input
                  type="radio"
                  name="price-filter"
                  id="$5000 & Over"
                  className="w-7 h-7 accent-flex-furniture-700"
                />
                <label htmlFor="$5000 & Over" className="text-2xl font-medium">
                  $5000 & Over
                </label>
              </li>
            </ul>
          </div>
          <div className="w-[75%] h-full">
            <div className="w-full h-full grid grid-cols-3 gap-10">
              {loading ? (
                <div className="w-full col-span-3 flex justify-center">
                  <Loading />
                </div>
              ) : (
                products.length > 0 &&
                products.map((product) => {
                  return (
                    <div key={product._id}>
                      <Link
                        to={`/shop/product/${
                          product.name
                        }/category/${product.category.toLowerCase()}/${
                          product._id
                        }`}
                      >
                        <ProductCard
                          name={product.name}
                          price={product.price}
                          discount={product.discount}
                          image={product.images[0]}
                        />
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
