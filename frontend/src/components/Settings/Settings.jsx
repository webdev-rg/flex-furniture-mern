import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Data } from "../DataProvider/DataProvider";

export const Settings = () => {
  const [email, setEmail] = useState("");
  const [isDeleteForm, setIsDeleteForm] = useState(false);
  const userData = JSON.parse(localStorage.getItem("user"));

  const handleCheckEmail = () => {
    if (!email) {
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
    } else {
      setIsDeleteForm(true);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full h-full p-10 flex flex-col gap-5">
        <div>
          <h1 className="text-4xl text-flex-furniture-950 font-semibold tracking-wide leading-relaxed">
            Settings
          </h1>
        </div>
        <div>
          <h1 className="text-4xl text-red-500 font-semibold tracking-wide leading-relaxed">
            Delete Account
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
              <div className="md:w-1/2 h-20">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-full px-8 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-slate-200 rounded-2xl read-only:bg-slate-100
               focus:border-flex-furniture-950 valid:border-flex-furniture-950 transition-all duration-300 ease-in-out"
                  required
                />
              </div>
            </div>
            <div className="w-full">
              <input
                type="button"
                value="Delete"
                className="px-8 py-3 border border-red-600 text-red-600 text-3xl font-semibold rounded-2xl cursor-pointer hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out"
                onClick={handleCheckEmail}
              />
            </div>
          </form>
        </div>
      </div>
      {isDeleteForm ? (
        <DeleteForm userData={userData} setIsDeleteForm={setIsDeleteForm} />
      ) : null}
    </>
  );
};

const DeleteForm = ({ userData, setIsDeleteForm }) => {
  const { setIsUserLoggedIn, URL } = useContext(Data);
  const [uniqueId, setUniqueId] = useState();

  const handleDelete = async (e) => {
    e.preventDefault();

    if (!uniqueId) {
      return toast.info("Enter your uniqueId", {
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

    if (uniqueId !== userData._id) {
      return toast.error("Incorrect uniqueId", {
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
      const response = await fetch(`${URL}/api/deleteuser`, {
        method: "DELETE",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ uniqueId }),
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
      <div
        style={{ backgroundColor: "rgba(2, 13, 25, 0.5)" }}
        className="w-full h-screen absolute top-0 left-0 z-20 flex items-center justify-center"
      >
        <div className="w-[50rem] p-10 bg-white rounded-2xl flex flex-col gap-8">
          <div className="w-full flex justify-between">
            <h1 className="text-3xl text-flex-furniture-950 font-semibold">
              Delete Account
            </h1>
            <div
              className="w-16 h-16 flex items-center justify-center bg-slate-200 rounded-xl cursor-pointer"
              onClick={() => setIsDeleteForm(false)}
            >
              <i className="fi fi-rr-cross-small text-3xl"></i>
            </div>
          </div>

          <form className="w-full">
            <div className="w-full flex flex-col gap-8">
              <p className="text-2xl text-flex-furniture-950 font-light leading-relaxed tracking-wide">
                Enter your unique id{" "}
                <span className="font-semibold">"{userData._id}"</span> to
                delete your account
              </p>
              <div className="w-full h-20">
                <input
                  type="text"
                  name="unique-id"
                  id="unique-id"
                  value={uniqueId}
                  onChange={(e) => setUniqueId(e.target.value)}
                  placeholder="Enter your unique id"
                  className="w-full h-full text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal tracking-wide border border-slate-200 rounded-2xl px-5 focus:border-flex-furniture-950 valid:border-flex-furniture-950"
                  required
                />
              </div>
              <div>
                <input
                  type="submit"
                  value="Delete my account"
                  className="px-6 py-4 border border-red-600 rounded-2xl text-2xl text-red-600 font-semibold hover:bg-red-600 hover:text-white transition-all duration-300 ease-in-out cursor-pointer"
                  onClick={handleDelete}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
