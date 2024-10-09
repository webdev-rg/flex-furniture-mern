import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Data } from "../DataProvider/DataProvider";

export const Signin = () => {
  const { URL } = useContext(Data);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSignin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/api/usersignin`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();

      if (
        data.message === "User not found" ||
        data.message === "Your account is not verified"
      ) {
        return toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (data.message === "Signin token has sent to your email") {
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
        localStorage.setItem("user", JSON.stringify(data.userData));
        setTimeout(() => {
          navigate("/verification");
        }, 2000);
      }
    } catch (error) {}
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen pt-40 sm:px-0 px-5">
        <div className="w-full h-full flex flex-col items-center justify-center">
          <div>
            <h1 className="text-4xl text-flex-furniture-950 font-semibold">
              Sign In with Flex Furniture
            </h1>
          </div>
          <div className="w-[40rem]">
            <form className="w-full flex flex-col gap-10 mt-10">
              <div className="w-full flex flex-col gap-5">
                <label
                  htmlFor="email"
                  className="text-3xl text-flex-furniture-950 font-semibold"
                >
                  Email
                </label>
                <div className="w-full h-24 relative">
                  <MdAlternateEmail className="absolute top-1/2 -translate-y-1/2 left-5 text-3xl" />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  onClick={handleSignin}
                />
              </div>
            </form>
            <div className="w-full mt-10 py-10 border-t border-t-slate-200 text-center absolute bottom-0 left-1/2 -translate-x-1/2">
              <p className="text-2xl text-flex-furniture-950">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold hover:text-gray-400 transition-all duration-200 ease-in-out"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
