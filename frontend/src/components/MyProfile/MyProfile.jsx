import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Data } from "../DataProvider/DataProvider";
import { Loading } from "../Loading/Loading";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const MyProfile = () => {
  const {
    URL,
    handleGetUser,
    updatedUserDetails,
    setUpdatedUserDetails,
    loading,
  } = useContext(Data);
  const [isReadOnly, setIsReadOnly] = useState(true);

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
      console.log(data.updatedUser);

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
        localStorage.setItem("user", JSON.stringify(data.updatedUser));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleMakeEditable = (e) => {
    e.preventDefault();
    setIsReadOnly(false);
  };

  useEffect(() => {
    handleGetUser();
  }, []);

  return (
    <>
      <ToastContainer />

      <div className="w-full h-full p-10 flex flex-col gap-10">
        <div>
          <h1 className="text-4xl text-flex-furniture-950 font-semibold tracking-wide leading-relaxed">
            Profile Info
          </h1>
        </div>
        <div className="w-full h-full">
          <form className="w-full h-full flex flex-col gap-10">
            <div className="w-full flex md:flex-row flex-col items-center justify-between gap-10">
              <div className="w-full flex flex-col gap-5">
                <label
                  htmlFor="firstName"
                  className="text-2xl text-flex-furniture-950 font-semibold"
                >
                  First Name
                </label>
                {loading ? (
                  <Skeleton width={467} height={60} borderRadius={10} />
                ) : (
                  <div className="w-full h-24">
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      placeholder="Firstname"
                      value={updatedUserDetails.firstName}
                      onChange={handleInputChange}
                      className={`w-full h-full px-10 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-slate-200 rounded-2xl ${
                        isReadOnly
                          ? "border-slate-200"
                          : "border-flex-furniture-950 focus:border-flex-furniture-950"
                      } read-only:bg-slate-100 read-only:cursor-not-allowed
                      valid:border-flex-furniture-950
                       transition-all duration-300 ease-in-out`}
                      required
                      readOnly={isReadOnly}
                    />
                  </div>
                )}
              </div>
              <div className="w-full flex flex-col gap-5">
                <label
                  htmlFor="lastName"
                  className="text-2xl text-flex-furniture-950 font-semibold"
                >
                  Last Name
                </label>
                {loading ? (
                  <Skeleton width={467} height={60} borderRadius={10} />
                ) : (
                  <div className="w-full h-24">
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      placeholder="Lastname"
                      value={updatedUserDetails.lastName}
                      onChange={handleInputChange}
                      className={`w-full h-full px-10 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-slate-200 rounded-2xl ${
                        isReadOnly
                          ? "border-slate-200"
                          : "border-flex-furniture-950 focus:border-flex-furniture-950"
                      } read-only:bg-slate-100 read-only:cursor-not-allowed
                      valid:border-flex-furniture-950
                       transition-all duration-300 ease-in-out`}
                      required
                      readOnly={isReadOnly}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex md:flex-row flex-col items-center justify-between gap-10">
              <div className="w-full flex flex-col gap-5">
                <label
                  htmlFor="email"
                  className="text-2xl text-flex-furniture-950 font-semibold"
                >
                  Email
                </label>
                {loading ? (
                  <Skeleton width={467} height={60} borderRadius={10} />
                ) : (
                  <div className="w-full h-24">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email"
                      value={updatedUserDetails.email}
                      onChange={handleInputChange}
                      className={`w-full h-full px-10 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-slate-200 rounded-2xl ${
                        isReadOnly
                          ? "border-slate-200"
                          : "border-flex-furniture-950 focus:border-flex-furniture-950"
                      } read-only:bg-slate-100 read-only:cursor-not-allowed
                      valid:border-flex-furniture-950
                       transition-all duration-300 ease-in-out`}
                      required
                      readOnly
                    />
                  </div>
                )}
              </div>
              <div className="w-full flex flex-col gap-5">
                <label
                  htmlFor="phone-number"
                  className="text-2xl text-flex-furniture-950 font-semibold"
                >
                  Phone Number
                </label>
                {loading ? (
                  <Skeleton width={467} height={60} borderRadius={10} />
                ) : (
                  <div className="w-full h-24">
                    <input
                      type="number"
                      name="phoneNumber"
                      id="phone-number"
                      placeholder="Phone Number"
                      value={updatedUserDetails.phoneNumber}
                      onChange={handleInputChange}
                      className={`w-full h-full px-10 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-slate-200 rounded-2xl ${
                        isReadOnly
                          ? "border-slate-200"
                          : "border-flex-furniture-950 focus:border-flex-furniture-950"
                      } read-only:bg-slate-100 read-only:cursor-not-allowed
                      valid:border-flex-furniture-950
                       transition-all duration-300 ease-in-out`}
                      required
                      readOnly={isReadOnly}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col gap-5">
              <label
                htmlFor="address"
                className="text-2xl text-flex-furniture-950 font-semibold"
              >
                Address
              </label>
              {loading ? (
                <Skeleton height={60} borderRadius={10} />
              ) : (
                <div className="w-full">
                  <textarea
                    name="address"
                    id="address"
                    value={updatedUserDetails.address}
                    onChange={handleInputChange}
                    className={`w-full h-52 px-10 py-5 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-slate-200 rounded-2xl ${
                      isReadOnly
                        ? "border-slate-200"
                        : "border-flex-furniture-950 focus:border-flex-furniture-950"
                    } read-only:bg-slate-100 read-only:cursor-not-allowed
                    valid:border-flex-furniture-950
                     transition-all duration-300 ease-in-out`}
                    required
                    placeholder="Address"
                    readOnly={isReadOnly}
                  ></textarea>
                </div>
              )}
            </div>
            <div className="w-full">
              {loading ? (
                <Skeleton width={150} height={60} borderRadius={10} />
              ) : (
                <>
                  {isReadOnly ? (
                    <input
                      type="button"
                      value="Edit Profile"
                      className="px-10 py-5 border border-flex-furniture-950 text-flex-furniture-950 text-3xl font-semibold rounded-2xl cursor-pointer hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out"
                      onClick={handleMakeEditable}
                    />
                  ) : (
                    <input
                      type="submit"
                      value="Update Profile"
                      className="px-10 py-5 border border-flex-furniture-950 text-flex-furniture-950 text-3xl font-semibold rounded-2xl cursor-pointer hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out"
                      onClick={handleUpdateUserDetails}
                    />
                  )}
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
