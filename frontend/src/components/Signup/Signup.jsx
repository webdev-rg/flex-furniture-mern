import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Data } from "../DataProvider/DataProvider";

export const Signup = () => {
  const { URL } = useContext(Data);
  const [nextForm, setNextForm] = useState(false);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navigate = useNavigate();
  const swiperRef = useRef(null);

  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckInputField = () => {
    if (!user.firstName || !user.lastName) {
      return toast.info("Firstname & Lastname is required", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setNextForm(true);
    swiperRef.current.slideNext();
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!user.email) {
      return toast.info("Enter your email", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    try {
      const response = await fetch(`${URL}/api/usersignup`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ user }),
      });

      const data = await response.json();
      console.log(data);

      if (data.message === "Email already exists") {
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
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (data.message === "Registration failed...") {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else if (data.message === "Verification token has sent to your email") {
        toast.success(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        console.log(data.message);
        localStorage.setItem("user", JSON.stringify(data.userData));
        setTimeout(() => {
          navigate("/verification");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen py-40 sm:px-32 px-5">
        <div className="w-full h-full flex justify-center items-center">
          <div className="sm:w-[40rem] w-full sm:p-5">
            <div className="w-full mb-10">
              <h1 className="text-5xl text-flex-furniture-950 font-bold text-center mb-5">
                Sign Up to Flex Furniture
              </h1>
            </div>
            <form className="w-full mt-10" autoComplete="off">
              <Swiper
                className="w-full"
                modules={[Navigation]}
                navigation={{
                  nextEl: ".next",
                }}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                allowTouchMove={false}
              >
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
                          name="firstName"
                          id="firstname"
                          value={user.firstName}
                          onChange={handleInputChange}
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
                        Last Name
                      </label>
                      <div className="w-full h-24 relative">
                        <i className="fi fi-rr-user absolute top-1/2 -translate-y-1/2 left-5 text-2xl"></i>
                        <input
                          type="text"
                          name="lastName"
                          id="lastname"
                          value={user.lastName}
                          onChange={handleInputChange}
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
                        className={`w-full h-full border border-flex-furniture-950 text-flex-furniture-950 text-3xl font-semibold rounded-2xl cursor-pointer hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out ${
                          nextForm ? "next" : ""
                        }`}
                        onClick={handleCheckInputField}
                      />
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="w-full h-full flex flex-col justify-center gap-10">
                    <div className="w-full flex flex-col gap-5">
                      <label
                        htmlFor="email"
                        className="text-2xl text-flex-furniture-950 font-semibold"
                      >
                        Email
                      </label>
                      <div className="w-full h-24 relative">
                        <i className="fi fi-rr-at absolute top-1/2 -translate-y-1/2 left-5 text-2xl"></i>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={user.email}
                          onChange={handleInputChange}
                          placeholder="Enter Your Email"
                          className="w-full h-full px-16 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-slate-200 rounded-2xl focus:border-flex-furniture-950 valid:border-flex-furniture-950 transition-all duration-300 ease-in-out"
                          required
                        />
                      </div>
                    </div>
                    <div className="w-full h-24">
                      <input
                        type="submit"
                        value="Sign Up"
                        className="w-full h-full border border-flex-furniture-950 text-flex-furniture-950 text-3xl font-semibold rounded-2xl cursor-pointer hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out"
                        onClick={handleSignup}
                      />
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </form>
            <div className="w-full mt-10 py-10 border-t border-t-slate-200 text-center absolute bottom-0 left-1/2 -translate-x-1/2">
              <p className="text-2xl">
                Don't have an account?{" "}
                <Link to="/signin" className="font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
