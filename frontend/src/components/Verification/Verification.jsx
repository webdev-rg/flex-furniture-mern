import React, { useContext, useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Data } from "../DataProvider/DataProvider";
import { useNavigate } from "react-router-dom";

export const Verification = () => {
  const { URL } = useContext(Data);
  const { setIsUserLoggedIn } = useContext(Data);
  const [verificationToken, setVerificationToken] = useState("");
  const [time, setTime] = useState(300);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [time]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleVerification = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${URL}/api/verify`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ verificationToken, email: userData.email }),
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
      } else if (data.message === "Incorrect verification token") {
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
        setVerificationToken("");
      } else if (data.message === "Verification token expires") {
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
      } else if (data.message === "Verification failed") {
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
      } else if (data.message === "Verification Successfull") {
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
        setIsUserLoggedIn(true);
        localStorage.setItem("userLoggedIn", "true");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full h-screen py-40 px-32">
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[45rem] p-5 flex flex-col gap-10">
            <div className="w-full text-center flex flex-col gap-4">
              <h1 className="text-5xl text-flex-furniture-950  font-semibold">
                Verify your account
              </h1>
              <p className="text-2xl text-flex-furniture-950 font-light leading-relaxed tracking-wide">
                We have sent you a token on your email{" "}
                <span className="font-medium">{userData.email}</span>.
              </p>
              {time === 0 ? (
                <div className="w-full flex items-center justify-center gap-2">
                  <p className="text-3xl text-flex-furniture-950 font-light">
                    Token expires.
                  </p>
                  <button className="px-10 py-4 bg-flex-furniture-950 text-white text-2xl rounded-xl">
                    Resend Token
                  </button>
                </div>
              ) : (
                <p className="text-2xl text-flex-furniture-950 font-light leading-relaxed tracking-wide">
                  You have only{" "}
                  <span className="font-semibold">{formatTime(time)}</span>{" "}
                  {time < 60 ? "seconds" : "minutes"} to verify your account.
                </p>
              )}
            </div>
            <form className="w-full flex flex-col gap-10">
              <div className="w-full flex flex-col gap-5">
                <label
                  htmlFor="verification-token"
                  className="text-2xl text-flex-furniture-950 font-semibold"
                >
                  Token
                </label>
                <div className="w-full h-24">
                  <input
                    type="password"
                    name="verification-token"
                    id="verification-token"
                    value={verificationToken}
                    onChange={(e) => setVerificationToken(e.target.value)}
                    placeholder="Enter Verification Token"
                    className="w-full h-full px-5 text-2xl text-flex-furniture-950 font-semibold tracking-wide placeholder:font-normal border border-slate-200 rounded-2xl focus:border-flex-furniture-950 valid:border-flex-furniture-950 transition-all duration-300 ease-in-out"
                    required
                  />
                </div>
              </div>
              <div className="w-full h-24">
                <input
                  type="submit"
                  value="Verify"
                  className="w-full h-full border border-flex-furniture-950 text-flex-furniture-950 text-3xl font-semibold rounded-2xl cursor-pointer hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out"
                  onClick={handleVerification}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
