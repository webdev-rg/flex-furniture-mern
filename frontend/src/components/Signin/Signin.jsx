import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

export const Signin = () => {
  const location = useLocation();

  return (
    <div className="w-full h-screen pt-40 sm:px-0 px-5">
      <div className="w-full h-full flex flex-col items-center justify-between">
        {location.pathname === "/signin/email" ? (
          <Outlet />
        ) : (
          <div className="w-[45rem]">
            <div className="w-full mb-10">
              <h1 className="text-5xl text-flex-furniture-950 font-bold text-center mb-5">
                Sign In to Flex Furniture
              </h1>
            </div>
            <div className="w-full flex flex-col gap-5">
              <div className="w-full h-24 flex items-center justify-center gap-3 px-10 text-center bg-slate-100 rounded-2xl">
                <img
                  src="images/google.png"
                  className="w-10"
                  alt="googlel-logo"
                />
                <h1 className="text-3xl text-flex-furniture-950 font-semibold">
                  Signin with Google
                </h1>
              </div>
              <div className="w-full h-24 flex items-center justify-center gap-3 px-10 text-center bg-slate-100 rounded-2xl">
                <img
                  src="/images/facebook.png"
                  className="w-10"
                  alt="facebook-logo"
                />
                <h1 className="text-3xl text-flex-furniture-950 font-semibold">
                  Signin with Facebook
                </h1>
              </div>
            </div>
            <div className="w-full my-10 text-center">
              <Link
                to="email"
                className="text-3xl text-flex-furniture-950 font-semibold hover:text-gray-400 transition-all duration-200 ease-in-out"
              >
                Continue with email
              </Link>
            </div>
          </div>
        )}

        <div className="w-full border-t py-10">
          <div className="text-center">
            <p className="text-3xl text-flex-furniture-950">
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
