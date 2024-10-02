import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

//? Category Images
import chairCategory from "/images/chair-category.png";
import lampCategory from "/images/lamp-category.png";
import tableCategory from "/images/table-category.png";
import bedCategory from "/images/bed-category.png";
import sofaCategory from "/images/sofa-category.png";

export const Category = ({ prevButton, nextButton, slides }) => {
  return (
    <Swiper
      slidesPerView={slides}
      spaceBetween={40}
      modules={[Autoplay, Navigation]}
      navigation={{
        nextEl: nextButton,
        prevEl: prevButton,
      }}
      autoplay={{ delay: 3000 }}
      loop={true}
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
      <SwiperSlide className="w-full">
        <Link to={`/shop/product-category/chair`}>
          <div className="w-full flex sm:flex-row flex-col items-center sm:justify-start justify-center gap-10">
            <div className="w-36 h-36 flex items-center justify-center bg-[#e7e7e7] rounded-full">
              <img
                src={chairCategory}
                className="w-[80%] h-[80%] object-contain"
                alt="chair-category"
              />
            </div>
            <div className="flex flex-col sm:text-start text-center gap-3">
              <h2 className="text-4xl font-extrabold">Chair</h2>
              <p className="text-3xl">7 Products</p>
            </div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className="w-full">
        <Link to={`/shop/product-category/lamp`}>
          <div className="w-full flex sm:flex-row flex-col items-center sm:justify-start justify-center gap-10">
            <div className="w-36 h-36 flex items-center justify-center bg-[#e7e7e7] rounded-full">
              <img
                src={lampCategory}
                className="w-[80%] h-[80%] object-contain"
                alt="lamp-category"
              />
            </div>
            <div className="flex flex-col sm:text-start text-center gap-3">
              <h2 className="text-4xl font-extrabold">Lamp</h2>
              <p className="text-3xl">7 Products</p>
            </div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className="w-full">
        <Link to={`/shop/product-category/table`}>
          <div className="w-full flex sm:flex-row flex-col items-center sm:justify-start justify-center gap-10">
            <div className="w-36 h-36 flex items-center justify-center bg-[#e7e7e7] rounded-full">
              <img
                src={tableCategory}
                className="w-[80%] h-[80%] object-contain"
                alt="table-category"
              />
            </div>
            <div className="flex flex-col sm:text-start text-center gap-3">
              <h2 className="text-4xl font-extrabold">Table</h2>
              <p className="text-3xl">7 Products</p>
            </div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className="w-full">
        <Link to={`/shop/product-category/bed`}>
          <div className="w-full flex sm:flex-row flex-col items-center sm:justify-start justify-center gap-10">
            <div className="w-36 h-36 flex items-center justify-center bg-[#e7e7e7] rounded-full">
              <img
                src={bedCategory}
                className="w-[80%] h-[80%] object-contain"
                alt="bed-category"
              />
            </div>
            <div className="flex flex-col sm:text-start text-center gap-3">
              <h2 className="text-4xl font-extrabold">Bed</h2>
              <p className="text-3xl">7 Products</p>
            </div>
          </div>
        </Link>
      </SwiperSlide>
      <SwiperSlide className="w-full">
        <Link to={`/shop/product-category/sofa`}>
          <div className="w-full flex sm:flex-row flex-col items-center sm:justify-start justify-center gap-10">
            <div className="w-36 h-36 flex items-center justify-center bg-[#e7e7e7] rounded-full">
              <img
                src={sofaCategory}
                className="w-[80%] h-[80%] object-contain"
                alt="sofa-category"
              />
            </div>
            <div className="flex flex-col sm:text-start text-center gap-3">
              <h2 className="text-4xl font-extrabold">Sofa</h2>
              <p className="text-3xl">7 Products</p>
            </div>
          </div>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};
