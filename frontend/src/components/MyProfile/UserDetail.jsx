import React, { useContext, useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Data } from "../DataProvider/DataProvider";

export const UserDetail = () => {
  const {
    URL,
    handleGetUser,
    updatedUserDetails,
    setUpdatedUserDetails,
    loading,
  } = useContext(Data);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateUserDetails = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/api/updateuser`, {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(updatedUserDetails),
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
      } else if (data.message === "Details updated successfully") {
        return toast.success(`${data.message}`, {
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
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full h-full p-10 flex flex-col gap-10">
          <div>
            <h1 className="text-4xl text-flex-furniture-950 font-semibold tracking-wide leading-relaxed">
              Profile Info
            </h1>
          </div>
          <div className="w-full h-full">
            <form className="w-full h-full flex flex-col gap-10">
              <div className="w-full flex items-center justify-between gap-10">
                <div className="w-full flex flex-col gap-5">
                  <label
                    htmlFor="firstName"
                    className="text-2xl text-flex-furniture-950 font-semibold"
                  >
                    First Name
                  </label>
                  <div className="w-full h-24">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Firstname"
                      value={updatedUserDetails.firstName}
                      onChange={handleInputChange}
                      className="w-full h-full px-10 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-slate-200 rounded-2xl focus:border-flex-furniture-950 valid:border-flex-furniture-950 transition-all duration-300 ease-in-out"
                      required
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                  <label
                    htmlFor="lastName"
                    className="text-2xl text-flex-furniture-950 font-semibold"
                  >
                    Last Name
                  </label>
                  <div className="w-full h-24">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Lastname"
                      value={updatedUserDetails.lastName}
                      onChange={handleInputChange}
                      className="w-full h-full px-10 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-slate-200 rounded-2xl focus:border-flex-furniture-950 valid:border-flex-furniture-950 transition-all duration-300 ease-in-out"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex items-center justify-between gap-10">
                <div className="w-full flex flex-col gap-5">
                  <label
                    htmlFor="email"
                    className="text-2xl text-flex-furniture-950 font-semibold"
                  >
                    Email
                  </label>
                  <div className="w-full h-24">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={updatedUserDetails.email}
                      onChange={handleInputChange}
                      className="w-full h-full px-10 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-flex-furniture-950 rounded-2xl read-only:bg-slate-100
               focus:border-flex-furniture-950 valid:border-flex-furniture-950 transition-all duration-300 ease-in-out cursor-not-allowed"
                      required
                      readOnly
                    />
                  </div>
                </div>
                <div className="w-full flex flex-col gap-5">
                  <label
                    htmlFor="phone-number"
                    className="text-2xl text-flex-furniture-950 font-semibold"
                  >
                    Phone Number
                  </label>
                  <div className="w-full h-24">
                    <input
                      type="number"
                      name="phoneNumber"
                      id="phone-number"
                      placeholder="Phone Number"
                      value={updatedUserDetails.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full h-full px-10 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-slate-200 rounded-2xl focus:border-flex-furniture-950 valid:border-flex-furniture-950 transition-all duration-300 ease-in-out"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="w-full flex flex-col gap-5">
                <label
                  htmlFor="address"
                  className="text-2xl text-flex-furniture-950 font-semibold"
                >
                  Address
                </label>
                <div className="w-full">
                  <textarea
                    name="address"
                    id="address"
                    value={updatedUserDetails.address}
                    onChange={handleInputChange}
                    className="w-full h-52 p-5 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-slate-200 rounded-2xl focus:border-flex-furniture-950 valid:border-flex-furniture-950 transition-all duration-300 ease-in-out"
                    required
                    placeholder="Address"
                  ></textarea>
                </div>
              </div>
              <div className="w-full">
                <input
                  type="submit"
                  value="Update Profile"
                  className="px-10 py-5 border border-flex-furniture-950 text-flex-furniture-950 text-3xl font-semibold rounded-2xl cursor-pointer hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out"
                  onClick={handleUpdateUserDetails}
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
