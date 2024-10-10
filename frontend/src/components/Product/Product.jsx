import React, { useContext, useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { GoHeart } from "react-icons/go";
import { RiFacebookLine, RiTwitterLine, RiInstagramLine } from "react-icons/ri";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useParams } from "react-router-dom";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Loading } from "../Loading/Loading";
import { Data } from "../DataProvider/DataProvider";

export const Product = () => {
  const { URL, isUserLoggedIn } = useContext(Data);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { productName } = useParams();
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleGetProduct = async () => {
    const response = await fetch(
      `${URL}/api/getproduct/${productName}`
    );

    const data = await response.json();
    console.log(data.productData);

    if (data.message === "Product not found") {
      alert(`${data.message}`);
    } else if (data.message === "Product found") {
      setProduct(data.productData);
      setProductImages(data.productImages);
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, []);
  console.log(product);

  return (
    <>
      <div className="w-full pt-40 px-32">
        <div className="w-full flex justify-between py-20">
          <div className="w-[40%] flex flex-col gap-10">
            <div>
              <Swiper
                style={{
                  "--swiper-navigation-color": "#020d19",
                  "--swiper-pagination-color": "#020d19",
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                modules={[FreeMode, Navigation, Thumbs]}
                loop={true}
              >
                {loading ? (
                  <Loading />
                ) : (
                  productImages.length > 0 &&
                  productImages.map((image, index) => {
                    return (
                      <SwiperSlide key={index} className="w-full h-[80%]">
                        <div className="w-full h-full">
                          <img
                            src={image}
                            className="w-full h-[80%] object-contain"
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })
                )}
              </Swiper>
            </div>
            <div>
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={15}
                slidesPerView={4}
                freeMode={true}
                modules={[FreeMode, Navigation, Thumbs]}
                loop={true}
              >
                {loading ? (
                  <Loading />
                ) : (
                  productImages.length > 0 &&
                  productImages.map((image, index) => {
                    return (
                      <SwiperSlide key={index} className="cursor-pointer">
                        <img
                          src={image}
                          className="w-full h-full object-cover"
                        />
                      </SwiperSlide>
                    );
                  })
                )}
              </Swiper>
            </div>
          </div>
          <div className="w-[60%] h-full px-20">
            {loading ? (
              <Loading />
            ) : (
              <>
                <div className="w-full h-full flex flex-col gap-10 pb-10 border-b">
                  <h1 className="text-5xl font-medium">{product.name}</h1>
                  <div className="w-full flex items-center gap-20">
                    <div className="flex items-center gap-3">
                      <FaStar className="text-3xl text-yellow-300" />
                      <FaStar className="text-3xl text-yellow-300" />
                      <FaStar className="text-3xl text-yellow-300" />
                      <FaStar className="text-3xl text-yellow-300" />
                      <FaStarHalfAlt className="text-3xl text-yellow-300" />
                      <span className="text-3xl font-medium">
                        ({product.rating})
                      </span>
                    </div>
                    <div>
                      <h2 className="text-[1.8rem] font-semibold">
                        Stock:{" "}
                        <span className="font-medium text-flex-furniture-950">
                          {product.stock}
                        </span>
                      </h2>
                    </div>
                  </div>
                  <h1 className="text-6xl tracking-wide">
                    ${product.price}{" "}
                    <span className="text-4xl text-red-600">
                      -{product.discount}%
                    </span>
                  </h1>
                  <p className="text-2xl leading-relaxed text-[#848484]">
                    {product.description}
                  </p>
                  <div className="w-full flex items-center gap-10">
                    <div className="flex items-center">
                      <button className="w-20 h-20 bg-[#efefef] text-3xl flex items-center justify-center">
                        <LuMinus />
                      </button>
                      <button className="w-20 h-20 bg-[#efefef] text-3xl">
                        1
                      </button>
                      <button className="w-20 h-20 bg-[#efefef] text-3xl flex items-center justify-center">
                        <GoPlus />
                      </button>
                    </div>
                    <div className="w-full">
                      <button className="w-full h-20 bg-flex-furniture-950 text-white text-2xl font-semibold tracking-wide">
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                  <div className="w-full">
                    <button className="w-full h-20 border border-flex-furniture-950 text-3xl font-bold tracking-wide hover:border-flex-furniture-600 hover:text-flex-furniture-600 transition-all duration-300">
                      BUY NOW
                    </button>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <div>
                      <h1 className="flex items-center gap-3 text-2xl">
                        <GoHeart /> Add to wishlist
                      </h1>
                    </div>
                    <div className="flex items-center gap-5">
                      <RiFacebookLine className="text-3xl" />
                      <RiInstagramLine className="text-3xl" />
                      <RiTwitterLine className="text-3xl" />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 py-10">
                  <h2 className="text-2xl font-semibold">
                    SKU:{" "}
                    <span className="font-normal text-[#848484]">0093</span>
                  </h2>
                  <h2 className="text-2xl font-semibold">
                    Brands:{" "}
                    <span className="font-normal text-[#848484]">
                      Creative Design
                    </span>
                  </h2>
                  <h2 className="text-2xl font-semibold">
                    Tags:{" "}
                    <span className="font-normal text-[#848484]">
                      Furniture, Trending, Wood
                    </span>
                  </h2>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
