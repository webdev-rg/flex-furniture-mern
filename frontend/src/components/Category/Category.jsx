import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { Data } from "../DataProvider/DataProvider";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const Category = ({ prevButton, nextButton }) => {
  const { URL } = useContext(Data);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  const handleGetCategories = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${URL}/api/getcategories`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (!data || data.message === "No category found") {
        alert(`${data.message}`);
        setLoading(false); // End loading
        return;
      }

      const categoriesWithImages = await Promise.all(
        data.map(async (item) => {
          try {
            const imageBlobRes = await fetch(
              `${URL}/api/getcategoryimage/${item._id}`
            );

            if (!imageBlobRes.ok) {
              throw new Error(`Error fetching image for category ${item._id}`);
            }

            const imageBlobData = await imageBlobRes.json();
            return { ...item, imageURL: imageBlobData.imageDataUrl };
          } catch (error) {
            console.error(
              `Error fetching image for category ${item._id}:`,
              error
            );
            return { ...item, imageURL: null };
          }
        })
      );

      setCategories(categoriesWithImages);
      setLoading(false); // End loading after data is set
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false); // End loading in case of error
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  useEffect(() => {
    if (swiperRef.current && !loading) {
      swiperRef.current.swiper.update();
    }
  }, [categories, loading]);

  return (
    <Swiper
      ref={swiperRef}
      key={categories.length}
      slidesPerView={4}
      spaceBetween={40}
      modules={[Autoplay, Navigation]}
      navigation={{
        nextEl: nextButton,
        prevEl: prevButton,
      }}
      autoplay={{ delay: 3000 }}
      loop={true}
      speed={2000}
      breakpoints={{
        1024: {
          slidesPerView: 4,
        },
        768: {
          slidesPerView: 3,
        },
        640: {
          slidesPerView: 2,
        },
        425: {
          slidesPerView: 2,
        },
        320: {
          slidesPerView: 1,
        },
      }}
      className="w-full"
    >
      {loading
        ? [...Array(4)].map((_, index) => (
            <SwiperSlide className="w-full" key={index}>
              <div className="w-full flex sm:flex-row flex-col items-center sm:justify-start justify-center gap-10">
                <div className="w-36 h-36 flex items-center justify-center rounded-full">
                  <Skeleton circle={true} width={90} height={90} />
                </div>
                <div className="flex flex-col sm:text-start text-center gap-3">
                  <Skeleton width={150} height={30} />
                  <Skeleton width={120} height={25} />
                </div>
              </div>
            </SwiperSlide>
          ))
        : categories.length > 0 &&
          categories.map((item) => {
            return (
              <SwiperSlide className="w-full" key={item._id}>
                <Link to={`/shop/product-category/${item.name}`}>
                  <div className="w-full flex sm:flex-row flex-col items-center sm:justify-start justify-center gap-10">
                    <div className="w-36 h-36 flex items-center justify-center bg-[#e7e7e7] rounded-full">
                      <img
                        src={item.imageURL}
                        className="w-[80%] h-[80%] object-contain"
                        alt={`${item.name}-category`}
                      />
                    </div>
                    <div className="flex flex-col sm:text-start text-center gap-3">
                      <h2 className="text-4xl font-extrabold">{item.name}</h2>
                      <p className="text-3xl">{item.productCount} Products</p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
    </Swiper>
  );
};
