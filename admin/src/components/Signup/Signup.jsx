import React, { useState } from "react";
import { HiOutlineEnvelope, HiOutlineLockClosed } from "react-icons/hi2";
import { Link } from "react-router-dom";
import axios from "axios";

export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAdmin = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("https://flex-furniture-server.onrender.com/api/createadmin", {
          email,
          password,
        })
        .then((data) => console.log(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[45rem] px-10 py-10">
        <div className="w-full flex flex-col items-center gap-10">
          <img src="/images/Admin-Logo.svg" className="w-96" alt="admin-logo" />
          <h1 className="text-7xl font-semibold">Sign Up</h1>
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
            <div className="w-full h-24">
              <input
                type="submit"
                value="Signup"
                className="w-full h-full border border-flex-furniture-950 text-flex-furniture-950 text-3xl font-semibold rounded-2xl cursor-pointer hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out"
                onClick={handleCreateAdmin}
              />
            </div>
            <div className="text-center">
              <p className="text-2xl">
                Already an admin?{" "}
                <Link to="/admin-signin" className="font-semibold">
                  Sign In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
