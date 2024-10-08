import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Settings = ({ setIsUserLoggedIn }) => {
  const [email, setEmail] = useState("");
  const userData = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleDelete = async (e) => {
    e.preventDefault();

    if (email !== userData.email) {
      return toast.error("Incorrect email", {
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
      const response = await fetch("http://localhost:1901/api/deleteuser", {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.message === "User not found") {
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
      } else if (data.message === "Your account deleted successfully") {
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
          setIsUserLoggedIn(false);
          localStorage.removeItem("user");
          navigate("/");
        }, 2000);
      }
    } catch (error) {}
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full h-full p-10 flex flex-col gap-10">
        <div>
          <h1 className="text-4xl text-flex-furniture-950 font-semibold tracking-wide leading-relaxed">
            Settings
          </h1>
        </div>
        <div className="w-full h-full">
          <form className="w-full h-full flex flex-col gap-10">
            <div className="w-full flex flex-col gap-5">
              <label
                htmlFor="email"
                className="text-2xl text-flex-furniture-950 font-semibold"
              >
                Enter your registered email
              </label>
              <div className="w-1/2 h-24">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full px-10 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-flex-furniture-950 rounded-2xl read-only:bg-slate-100
               focus:border-flex-furniture-950 valid:border-flex-furniture-950 transition-all duration-300 ease-in-out"
                  required
                />
              </div>
            </div>
            <div className="w-full">
              <input
                type="submit"
                value="Delete Account"
                className="px-10 py-5 border border-red-600 text-red-600 text-3xl font-semibold rounded-2xl cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out"
                onClick={handleDelete}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
