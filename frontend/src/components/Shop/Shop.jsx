import React, { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Category } from "../Category/Category";
import { ProductCard } from "../ProductCard/ProductCard";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";
import { Data } from "../DataProvider/DataProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Shop = () => {
  const { products, setProducts, loading, setLoading, URL, handleGetProducts } =
    useContext(Data);
  const { category } = useParams();

  const handleGetProductByCategory = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/api/productbycategory/${category}`);

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
      <div className="w-full h-full lg:px-32 px-5 pb-20">
        <div className="w-full h-full">
          <div className="w-full h-full">
            <div className="w-full h-full grid md:grid-cols-4 grid-cols-2 gap-10">
              {loading
                ? [...Array(4)].map((_, index) => (
                    <div className="w-full flex flex-col gap-5" key={index}>
                      <div className="w-full h-[40rem] flex items-center justify-center rounded-full">
                        <Skeleton width={315.75} height={400} />
                      </div>
                      <div className="flex flex-col sm:text-start text-center gap-3">
                        <Skeleton width={275} height={25} />
                        <Skeleton width={220} height={30} />
                      </div>
                    </div>
                  ))
                : products.length > 0 &&
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
                  })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
