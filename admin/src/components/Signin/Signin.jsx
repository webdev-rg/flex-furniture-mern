import React, { useState } from "react";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { HiOutlineLockClosed } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Signin = ({ isLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleAdminLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Email & password is required");
    }

    try {
      const response = await fetch(
        "https://flex-furniture-server.onrender.com/api/adminsignin",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (
        data.message === "Incorrect Email" ||
        data.message === "Incorrect Password"
      ) {
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
      } else if (data.message === "Login Successful") {
        isLoggedIn(true);
        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminData", JSON.stringify(data.dataa));
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
        setTimeout(() => {
          navigate("/admin-dashboard");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-[45rem] px-10 py-10">
          <div className="w-full flex flex-col items-center gap-10">
            <img
              src="/images/Admin-Logo.svg"
              className="w-96"
              alt="admin-logo"
            />
            <h1 className="text-7xl font-semibold">Sign In</h1>
          </div>
          <div className="w-full h-full mt-10">
            <form className="w-full h-full flex flex-col gap-10">
              <div className="flex flex-col gap-5">
                <label
                  htmlFor="admin-email"
                  className="text-2xl font-semibold tracking-wide"
                >
                  Email
                </label>
                <div className="w-full h-24 relative">
                  <HiOutlineEnvelope className="absolute top-1/2 -translate-y-1/2 left-5 text-3xl" />
                  <input
                    type="email"
                    id="admin-email"
                    name="admin-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter Email"
                    className="w-full h-full px-16 border border-slate-300 rounded-2xl text-2xl font-semibold placeholder:font-light focus:border-flex-furniture-950 valid:border-flex-furniture-950"
                    required
                  />
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <label
                  htmlFor="admin-email"
                  className="text-2xl font-semibold tracking-wide"
                >
                  Password
                </label>
                <div className="w-full h-24 relative">
                  <HiOutlineLockClosed className="absolute top-1/2 -translate-y-1/2 left-5 text-3xl" />
                  <input
                    type="password"
                    id="admin-password"
                    name="admin-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter Password"
                    className="w-full h-full px-16 border border-slate-300 rounded-2xl text-2xl font-semibold placeholder:font-light focus:border-flex-furniture-950 valid:border-flex-furniture-950"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Link className="text-2xl font-medium">Forgot Password</Link>
              </div>
              <div className="w-full h-24">
                <input
                  type="submit"
                  value="Signin"
                  className="w-full h-full border border-flex-furniture-950 text-flex-furniture-950 text-3xl font-semibold rounded-2xl cursor-pointer hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out"
                  onClick={handleAdminLogin}
                />
              </div>
              <div className="text-center">
                <p className="text-2xl">
                  Don't have an admin account?{" "}
                  <Link to="/admin-signup" className="font-semibold">
                    Sign Up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
