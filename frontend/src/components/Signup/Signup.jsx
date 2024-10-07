import React from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const Signup = () => {
  return (
    <div className="w-full h-full py-40 sm:px-32 px-5">
      <div className="w-full h-full flex justify-center">
        <div className="sm:w-[45rem] w-full sm:p-5">
          <div className="w-full mb-10">
            <h1 className="text-5xl text-flex-furniture-950 font-bold text-center mb-5">
              Sign Up to Flex Furniture
            </h1>
          </div>
          <div className="w-full flex flex-col gap-5">
            <div className="w-full h-24 flex items-center justify-center gap-3 px-10 text-center bg-slate-100 rounded-2xl">
              <img
                src="images/google.png"
                className="w-10"
                alt="googlel-logo"
              />
              <h1 className="text-3xl text-flex-furniture-950 font-semibold">
                Signup with Google
              </h1>
            </div>
            <div className="w-full h-24 flex items-center justify-center gap-3 px-10 text-center bg-slate-100 rounded-2xl">
              <img
                src="/images/facebook.png"
                className="w-10"
                alt="facebook-logo"
              />
              <h1 className="text-3xl text-flex-furniture-950 font-semibold">
                Signup with Facebook
              </h1>
            </div>
          </div>
          <p className="mt-10 text-center text-2xl text-flex-furniture-950 font-semibold">
            OR
          </p>
          <form className="w-full  mt-10">
            <Swiper className="w-full">
              <SwiperSlide>
                <div className="w-full h-full flex flex-col gap-10">
                  <div className="w-full flex flex-col gap-5">
                    <label
                      htmlFor="firstname"
                      className="text-2xl text-flex-furniture-950 font-semibold"
                    >
                      First Name
                    </label>
                    <div className="w-full h-24 relative">
                      <i className="fi fi-rr-user absolute top-1/2 -translate-y-1/2 left-5 text-2xl"></i>
                      <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        placeholder="Enter Your First Name"
                        className="w-full h-full px-16 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-slate-200 rounded-2xl focus:border-flex-furniture-950 valid:border-flex-furniture-950 transition-all duration-300 ease-in-out"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full flex flex-col gap-5">
                    <label
                      htmlFor="lastname"
                      className="text-2xl text-flex-furniture-950 font-semibold"
                    >
                      Continue with email
                    </label>
                    <div className="w-full h-24 relative">
                      <i className="fi fi-rr-at absolute top-1/2 -translate-y-1/2 left-5 text-2xl"></i>
                      <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        placeholder="Enter Your Last Name"
                        className="w-full h-full px-16 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-slate-200 rounded-2xl focus:border-flex-furniture-950 valid:border-flex-furniture-950 transition-all duration-300 ease-in-out"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full h-24">
                    <input
                      type="button"
                      value="Next"
                      className="w-full h-full border border-flex-furniture-950 text-flex-furniture-950 text-3xl font-semibold rounded-2xl cursor-pointer hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out"
                    />
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="w-full h-full flex flex-col gap-10">
                  <div className="w-full flex flex-col gap-5">
                    <label
                      htmlFor="email"
                      className="text-2xl text-flex-furniture-950 font-semibold"
                    >
                      Continue with email
                    </label>
                    <div className="w-full h-24 relative">
                      <i className="fi fi-rr-at absolute top-1/2 -translate-y-1/2 left-5 text-2xl"></i>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Your Email"
                        className="w-full h-full px-16 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-slate-200 rounded-2xl focus:border-flex-furniture-950 valid:border-flex-furniture-950 transition-all duration-300 ease-in-out"
                        required
                      />
                    </div>
                  </div>
                  <div className="w-full h-24">
                    <input
                      type="submit"
                      value="Sign In"
                      className="w-full h-full border border-flex-furniture-950 text-flex-furniture-950 text-3xl font-semibold rounded-2xl cursor-pointer hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out"
                    />
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </form>
          <div className="text-center mt-10">
            <p className="text-2xl">
              Don't have an account?{" "}
              <Link to="/signup" className="font-semibold">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
