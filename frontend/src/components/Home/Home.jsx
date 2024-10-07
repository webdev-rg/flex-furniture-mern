import React from "react";

//? Home Slide Images
import slide1 from "/images/slide-1.jpg";
import slide2 from "/images/slide-2.jpg";
import slide3 from "/images/slide-3.jpg";

import bigLamp from "/images/lamp.jpg";
import bigSofa from "/images/sofa-2.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

import { Link } from "react-router-dom";
import { ProductCard } from "../ProductCard/ProductCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import { Category } from "../Category/Category";

export const Home = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {/* Hero Section */}
      <div className="w-full h-screen pt-32">
        <div className="w-full h-full grid sm:grid-cols-2 grid-cols-1">
          <div className="w-full h-full relative">
            <div className="h-full px-10 absolute left-0 top-0 md:flex md:items-center z-10 swiper-button-prev hidden">
              <BsChevronLeft className="text-7xl text-flex-furniture-950 cursor-pointer" />
            </div>
            <Swiper
              className="w-full h-full bg-[#f8f8f8]"
              modules={[Autoplay, Navigation]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              autoplay={{ delay: 3000 }}
              loop={true}
              dir="rtl"
            >
              <SwiperSlide className="w-full h-full">
                <div className="w-full h-full flex items-center justify-center ">
                  <div className="lg:w-1/2 md:w-2/3 w-full sm:text-end text-center px-5 py-20">
                    <h1 className="text-6xl font-semibold tracking-wide mb-8">
                      Small Sofa
                    </h1>
                    <p className="text-2xl text-[#929292] leading-snug tracking-wider mb-8">
                      Chair with ash structure varnished with natural, black or
                      Canaletto walnut finish
                    </p>
                    <Link
                      to={`/shop/product-category/allproducts`}
                      className="text-2xl tracking-wide font-medium relative after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-flex-furniture-950 hover:after:w-full after:transition-all after:duration-300 after:ease-in-out"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-full h-full">
                <div className="w-full h-full flex items-center justify-center text-end">
                  <div className="lg:w-1/2 md:w-2/3 w-full sm:text-end text-center px-5 py-20">
                    <h1 className="text-6xl font-semibold tracking-wide mb-8">
                      Cabin Armchair
                    </h1>
                    <p className="text-2xl text-[#929292] leading-snug tracking-wider mb-8">
                      From armchairs, desks, lamps, and tables, to the smallest
                      everyday items
                    </p>
                    <Link
                      to={`/shop/product-category/allproducts`}
                      className="text-2xl tracking-wide font-medium relative after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-flex-furniture-950 hover:after:w-full after:transition-all after:duration-300 after:ease-in-out"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-full h-full">
                <div className="w-full h-full flex items-center justify-center text-end">
                  <div className="lg:w-1/2 md:w-2/3 w-full sm:text-end text-center px-5 py-20">
                    <h1 className="text-6xl font-semibold tracking-wide mb-8">
                      New Trends
                    </h1>
                    <p className="text-2xl text-[#929292] leading-snug tracking-wider mb-8">
                      It's not just a combination of modules that allows for
                      infinite transformation
                    </p>
                    <Link
                      to={`/shop/product-category/allproducts`}
                      className="text-2xl tracking-wide font-medium relative after:absolute after:content-[''] after:left-0 after:bottom-0 after:w-0 after:h-[1px] after:bg-flex-furniture-950 hover:after:w-full after:transition-all after:duration-300 after:ease-in-out"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="w-full h-full relative">
            <Swiper
              className="w-full h-full bg-[#f8f8f8]"
              modules={[Autoplay, Navigation]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              autoplay={{ delay: 3000 }}
              loop={true}
            >
              <SwiperSlide className="w-full h-full">
                <div className="w-full h-full">
                  <img
                    src={slide1}
                    className="w-full h-full lg:object-cover object-contain"
                    alt=""
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-full h-full">
                <div className="w-full h-full">
                  <img
                    src={slide2}
                    className="w-full h-full lg:object-cover object-contain"
                    alt=""
                  />
                </div>
              </SwiperSlide>
              <SwiperSlide className="w-full h-full">
                <div className="w-full h-full">
                  <img
                    src={slide3}
                    className="w-full h-full lg:object-cover object-contain"
                    alt=""
                  />
                </div>
              </SwiperSlide>
            </Swiper>
            <div className="h-full px-10 absolute right-0 top-0 md:flex md:items-center z-10 swiper-button-next hidden">
              <BsChevronRight className="text-7xl text-flex-furniture-950 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="w-full py-20 lg:px-32 px-5 flex flex-col gap-20">
        <div className="w-full flex items-center md:items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-wider">
              SHOP BY CATEGORY
            </h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-white border border-flex-furniture-100 rounded-full hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out swiper-button-prev-category">
              <button className="w-full h-full bg-transparent rounded-full flex items-center justify-center text-4xl">
                <FiChevronLeft />
              </button>
            </div>
            <div className="w-20 h-20 bg-white border border-flex-furniture-100 rounded-full hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out swiper-button-next-category">
              <button className="w-full h-full bg-transparent rounded-full flex items-center justify-center text-4xl">
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
        <Category
          prevButton=".swiper-button-prev-category"
          nextButton=".swiper-button-next-category"
          slides={4}
        />
      </div>

      {/* Offer Section */}
      <div className="w-full py-20 lg:px-32 px-5 flex md:flex-row flex-col justify-between gap-10">
        <div className="lg:w-[35%] md:w-1/2 flex flex-col gap-10">
          <div className="w-full">
            <img
              src={bigLamp}
              className="w-full h-[80rem] object-cover"
              alt="big-lamp"
            />
          </div>
          <div className="w-full flex flex-col items-center gap-8 text-center">
            <p className="text-2xl tracking-wider">ENDS TOMORROW</p>
            <h1 className="text-7xl tracking-wide leading-snug">
              Up To 40% Off Top Lamp Brands
            </h1>
          </div>
        </div>
        <div className="lg:w-[65%] md:w-1/2 flex flex-col gap-10">
          <div className="w-full">
            <img
              src={bigSofa}
              className="w-full h-[80rem] object-cover"
              alt=""
            />
          </div>
          <div className="w-full flex flex-col items-center gap-8 text-center">
            <p className="text-2xl tracking-wider">BIG SALE</p>
            <h1 className="text-7xl tracking-wide leading-snug">
              Up to 70% Off On Furniture & Decor Products
            </h1>
          </div>
        </div>
      </div>

      {/* Best Sellar */}
      <div className="w-full py-20 lg:px-32 px-5 flex flex-col gap-20">
        <div className="w-full flex justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-wider">BEST SELLARS</h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-white border border-flex-furniture-100 rounded-full hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out swiper-button-prev-best-sellar">
              <button className="w-full h-full bg-transparent rounded-full flex items-center justify-center text-4xl">
                <FiChevronLeft />
              </button>
            </div>
            <div className="w-20 h-20 bg-white border border-flex-furniture-100 rounded-full hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out swiper-button-next-best-sellar">
              <button className="w-full h-full bg-transparent rounded-full flex items-center justify-center text-4xl">
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          modules={[Autoplay, Navigation]}
          navigation={{
            nextEl: ".swiper-button-next-best-sellar",
            prevEl: ".swiper-button-prev-best-sellar",
          }}
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            1440: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 1,
            },
            320: {
              slidesPerView: 1,
            },
          }}
          className="w-full"
        >
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Banner */}
      <div className="w-full lg:px-32 px-5 py-20">
        <div className="w-full bg-[#ffe6d0] grid md:grid-cols-2 gap-16">
          <div className="w-full h-full">
            <div className="w-full md:py-40 py-20 px-10 flex flex-col items-center gap-10">
              <p className="lg:text-6xl text-4xl tracking-wide">
                END OF SEASON SALE
              </p>
              <h1 className="lg:text-9xl md:text-8xl text-7xl text-center">
                Up To 60% OFF
              </h1>
              <div className="grid sm:grid-cols-4 grid-cols-2 gap-8">
                <div className="lg:w-56 md:w-36 w-52 lg:h-56 md:h-36 h-52 flex flex-col items-center justify-center lg:gap-3 bg-white rounded-full">
                  <h1 className="lg:text-6xl text-4xl font-bold tracking-wide">
                    1062
                  </h1>
                  <p className="lg:text-4xl text-2xl tracking-wider">Days</p>
                </div>
                <div className="lg:w-56 md:w-36 w-52 lg:h-56 md:h-36 h-52 flex flex-col items-center justify-center lg:gap-3 bg-white rounded-full">
                  <h1 className="lg:text-6xl text-4xl font-bold tracking-wide">
                    11
                  </h1>
                  <p className="lg:text-4xl text-2xl tracking-wider">Hours</p>
                </div>
                <div className="lg:w-56 md:w-36 w-52 lg:h-56 md:h-36 h-52 flex flex-col items-center justify-center lg:gap-3 bg-white rounded-full">
                  <h1 className="lg:text-6xl text-4xl font-bold tracking-wide">
                    36
                  </h1>
                  <p className="lg:text-4xl text-2xl tracking-wider">Minutes</p>
                </div>
                <div className="lg:w-56 md:w-36 w-52 lg:h-56 md:h-36 h-52 flex flex-col items-center justify-center lg:gap-3 bg-white rounded-full">
                  <h1 className="lg:text-6xl text-4xl font-bold tracking-wide">
                    51
                  </h1>
                  <p className="lg:text-4xl text-2xl tracking-wider">Seconds</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-full lg:px-20 px-10 flex items-end">
            <img src="/images/sofa.png" alt="" />
          </div>
        </div>
      </div>

      {/* New Products */}
      <div className="w-full py-20 lg:px-32 px-5 flex flex-col gap-20">
        <div className="w-full flex justify-between">
          <div>
            <h1 className="text-4xl font-bold tracking-wider">NEW PRODUCTS</h1>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 bg-white border border-flex-furniture-100 rounded-full hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out swiper-button-prev-new-products">
              <button className="w-full h-full bg-transparent rounded-full flex items-center justify-center text-4xl">
                <FiChevronLeft />
              </button>
            </div>
            <div className="w-20 h-20 bg-white border border-flex-furniture-100 rounded-full hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out swiper-button-next-new-products">
              <button className="w-full h-full bg-transparent rounded-full flex items-center justify-center text-4xl">
                <FiChevronRight />
              </button>
            </div>
          </div>
        </div>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          modules={[Autoplay, Navigation]}
          navigation={{
            nextEl: ".swiper-button-next-new-products",
            prevEl: ".swiper-button-prev-new-products",
          }}
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            1440: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 2,
            },
            480: {
              slidesPerView: 1,
            },
            320: {
              slidesPerView: 1,
            },
          }}
          className="w-full"
        >
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide>
            <ProductCard />
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Offer Section */}
      <div className="w-full lg:px-32 px-5 py-20">
        <div
          style={{ backgroundImage: "url('/images/background-section-1.jpg')" }}
          className="w-full md:p-24 p-10"
        >
          <div className="py-24 sm:px-20 px-10 bg-white flex flex-col items-center justify-center text-center gap-8">
            <h1 className="sm:text-8xl text-6xl font-semibold tracking-wide">
              Get A $20 Flex Card
            </h1>
            <p className="text-5xl">When You Buy $100 E-Gift Cards</p>
            <p className="flex items-center gap-8 text-2xl">
              ENDS 22-11-2024{" "}
              <Link
                to={``}
                className="font-semibold tracking-wider underline hover:text-[#bbb] transition-all duration-300 ease-in-out"
              >
                SHOP NOW
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
