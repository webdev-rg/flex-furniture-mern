import React, { useEffect, useState } from "react";
import { Loading } from "../Loading/Loading";

export const UserDetail = () => {
  const userData = JSON.parse(localStorage.getItem("user"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleGetUser = async () => {
    try {
      const response = await fetch("http://localhost:1901/api/userdetails", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: userData.email }),
      });

      const data = await response.json();
      // console.log(data)

      if (data.message === "User not found") {
        alert(`${data.message}`);
      } else if (data.message === "User found") {
        setUser(data.userDetails);
        console.log("userData:", data.userDetails);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetUser();
  }, []);
  console.log(user);
  // console.log(userData);

  return (
    <>
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
                      defaultValue={user.firstName ? user.firstName : ""}
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
                      defaultValue={user.lastName}
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
                      defaultValue={user.email}
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
                      name="phone-number"
                      id="phone-number"
                      placeholder="Phone Number"
                      defaultValue={user.phoneNumber}
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
                    defaultValue={user.address}
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
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
