import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";

export const Signup = () => {
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
      return alert("Firstname & Lastname are requirefd");
    }
    setNextForm(true);
    swiperRef.current.slideNext();
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!user.email) {
      return alert("Enter your email");
    }

    try {
      const response = await fetch("http://localhost:1901/api/usersignup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ user }),
      });

      const data = await response.json();

      if (
        data.message === "Email already exists" ||
        data.message === "Registration failed..."
      ) {
        alert(`${data.message}`);
        window.location.reload();
      } else if (data.message === "OTP has sent to your email") {
        alert(`${data.message}`);
        setTimeout(() => {
          navigate("/verification");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
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
  );
};
