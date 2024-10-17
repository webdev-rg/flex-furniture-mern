import React, { useContext, useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { RiFacebookLine, RiTwitterLine, RiInstagramLine } from "react-icons/ri";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useParams } from "react-router-dom";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Loading } from "../Loading/Loading";
import { Data } from "../DataProvider/DataProvider";
import { ScrollToTop } from "../ScrollToTop/ScrollToTop";

export const Product = () => {
  const { URL, isUserLoggedIn, userData, handleGetCartDetails } =
    useContext(Data);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { productName } = useParams();
  const [product, setProduct] = useState(null);
  const [productImages, setProductImages] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const handleIncreaseQuanity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    if (quantity >= product.stock) {
      toast.info(`Only ${product.stock} ${product.name} are available`, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setQuantity(product.stock);
    }
  };

  const handleDecreaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity - 1);
    if (quantity <= 1) {
      setQuantity(1);
    }
  };

  const handleGetProduct = async () => {
    setLoading(true);
    const response = await fetch(`${URL}/api/getproduct/${productName}`);

    const data = await response.json();

    if (data.message === "Product not found") {
      alert(`${data.message}`);
    } else if (data.message === "Product found") {
      setProduct(data.productData);
      setProductImages(data.productImages);
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isUserLoggedIn) {
      toast.info("Signin to add product to cart", {
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

    try {
      const formData = new FormData();
      formData.append("productName", product.name);
      formData.append("productPrice", product.price);
      formData.append("productQuantity", quantity);
      formData.append("productImage", productImages[0]);
      formData.append("userAddress", userData.address);
      formData.append("userId", userData._id);

      const response = await fetch(`${URL}/api/addtocart`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      console.log(data);

      if (data.message === "Product added to your cart") {
        toast.success(`${product.name} added to your cart`, {
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
      } else if (data.message === "Something went wrong please try again") {
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
      } else if (data.message === "No file uploaded") {
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, [productName]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <ToastContainer />
      {/* Scroll To Top */}
      <div className="fixed right-0 bottom-0">
        <ScrollToTop />
      </div>

      {/* Product */}
      <div className="w-full pt-40 px-32">
        {loading ? (
          <Loading />
        ) : (
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
                  {productImages.length > 0 &&
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
                    })}
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
                  {productImages.length > 0 &&
                    productImages.map((image, index) => {
                      return (
                        <SwiperSlide key={index} className="cursor-pointer">
                          <img
                            src={image}
                            className="w-full h-48 object-cover"
                          />
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>

            <div className="w-[60%] h-full px-20">
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
                    <button
                      className="w-20 h-20 bg-[#efefef] text-3xl flex items-center justify-center"
                      onClick={handleDecreaseQuantity}
                    >
                      <LuMinus />
                    </button>
                    <button className="w-20 h-20 bg-[#efefef] text-3xl">
                      {quantity}
                    </button>
                    <button
                      className="w-20 h-20 bg-[#efefef] text-3xl flex items-center justify-center"
                      onClick={handleIncreaseQuanity}
                    >
                      <GoPlus />
                    </button>
                  </div>
                  <div className="w-full">
                    <button
                      className="w-full h-20 bg-flex-furniture-950 text-white text-2xl font-semibold tracking-wide"
                      onClick={handleAddToCart}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
                <div className="w-full">
                  <button className="w-full h-20 border border-flex-furniture-950 text-3xl font-bold tracking-wide hover:border-flex-furniture-600 hover:text-flex-furniture-600 transition-all duration-300">
                    BUY NOW
                  </button>
                </div>
                <div className="w-full">
                  <div className="flex items-center gap-5">
                    <RiFacebookLine className="text-3xl" />
                    <RiInstagramLine className="text-3xl" />
                    <RiTwitterLine className="text-3xl" />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 py-10">
                <h2 className="text-2xl font-semibold">
                  SKU: <span className="font-normal text-[#848484]">0093</span>
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
            </div>
          </div>
        )}
      </div>
    </>
  );
};
