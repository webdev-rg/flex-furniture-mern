import React, { useState } from "react";
import { HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import { LuUser2 } from "react-icons/lu";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signup = () => {
  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setAdminData({
      ...adminData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdminSignup = async (e) => {
    e.preventDefault();

    try {
      await fetch(
        "https://flex-furniture-server.onrender.com/api/adminsignup",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ adminData }),
        }
      )
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          if (data.message === "Admin already exists") {
            toast.info(`${data.message}`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setAdminData({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            });
          } else if (data.message === "Admin Created Successfully") {
            toast.success(`${data.message}`, {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setAdminData({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            });
          } else if (data.message === "Error creating admin") {
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
            setAdminData({
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            });
          }
        })
        .catch((err) => console.error(err));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[80rem] px-10 py-10">
          <div className="w-full flex flex-col items-center gap-10">
            <img
              src="/images/Admin-Logo.svg"
              className="w-96"
              alt="admin-logo"
            />
            <h1 className="text-7xl font-semibold text-flex-furniture-950">
              Sign Up
            </h1>
          </div>
          <div className="w-full h-full mt-10">
            <form className="w-full h-full flex flex-col gap-10">
              <div className="w-ful flex gap-10">
                <div className="w-full flex flex-col gap-5">
                  <label
                    htmlFor="admin-first-name"
                    className="text-2xl text-flex-furniture-950 font-semibold tracking-wide"
                  >
                    First Name
                  </label>
                  <div className="w-full h-24 relative">
                    <LuUser2 className="absolute top-1/2 text-flex-furniture-950 -translate-y-1/2 left-5 text-3xl" />
                    <input
                      type="text"
                      id="admin-first-name"
                      name="firstName"
                      value={adminData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter First Name"
                      className="w-full h-full px-16 border border-slate-300 rounded-2xl text-2xl text-flex-furniture-950 font-semibold placeholder:font-light focus:border-flex-furniture-950 valid:border-flex-furniture-950"
                      required
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                  <label
                    htmlFor="admin-last-name"
                    className="text-2xl text-flex-furniture-950 font-semibold tracking-wide"
                  >
                    Last Name
                  </label>
                  <div className="w-full h-24 relative">
                    <LuUser2 className="absolute top-1/2 text-flex-furniture-950 -translate-y-1/2 left-5 text-3xl" />
                    <input
                      type="text"
                      id="admin-last-name"
                      name="lastName"
                      value={adminData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter Last Name"
                      className="w-full h-full px-16 border border-slate-300 rounded-2xl text-2xl text-flex-furniture-950 font-semibold placeholder:font-light focus:border-flex-furniture-950 valid:border-flex-furniture-950"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="w-ful flex gap-10">
                <div className="w-full flex flex-col gap-5">
                  <label
                    htmlFor="admin-email"
                    className="text-2xl text-flex-furniture-950 font-semibold tracking-wide"
                  >
                    Email
                  </label>
                  <div className="w-full h-24 relative">
                    <HiOutlineEnvelope className="absolute top-1/2 text-flex-furniture-950 -translate-y-1/2 left-5 text-3xl" />
                    <input
                      type="email"
                      id="admin-email"
                      name="email"
                      value={adminData.email}
                      onChange={handleInputChange}
                      placeholder="Enter Email"
                      className="w-full h-full px-16 border border-slate-300 rounded-2xl text-2xl text-flex-furniture-950 font-semibold placeholder:font-light focus:border-flex-furniture-950 valid:border-flex-furniture-950"
                      required
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                  <label
                    htmlFor="admin-password"
                    className="text-2xl text-flex-furniture-950 font-semibold tracking-wide"
                  >
                    Password
                  </label>
                  <div className="w-full h-24 relative">
                    <HiOutlineLockClosed className="absolute top-1/2 text-flex-furniture-950 -translate-y-1/2 left-5 text-3xl" />
                    <input
                      type="password"
                      id="admin-password"
                      name="password"
                      value={adminData.password}
                      onChange={handleInputChange}
                      placeholder="Enter Password"
                      className="w-full h-full px-16 border border-slate-300 rounded-2xl text-2xl text-flex-furniture-950 font-semibold placeholder:font-light focus:border-flex-furniture-950 valid:border-flex-furniture-950"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="h-24 flex justify-center">
                <input
                  type="submit"
                  value="Signup"
                  className="px-40 h-full border border-flex-furniture-950 text-flex-furniture-950 text-3xl font-semibold rounded-2xl cursor-pointer hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out"
                  onClick={handleAdminSignup}
                />
              </div>
            </form>
            <div className="text-center mt-10">
              <p className="text-2xl text-flex-furniture-950">
                Already an admin?{" "}
                <Link to="/admin-signin" className="font-semibold">
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
