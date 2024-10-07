import React from "react";
import { Link } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";

export const Signin = () => {
  return (
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
  );
};
