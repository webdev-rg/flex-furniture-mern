import React, { useEffect, useState } from "react";

export const Verification = () => {
  const [time, setTime] = useState(300);

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

  return (
    <div className="w-full h-screen py-40 px-32">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[45rem] p-5 flex flex-col gap-10">
          <div className="w-full text-center flex flex-col gap-4">
            <h1 className="text-5xl text-flex-furniture-950  font-semibold">
              Verify your account
            </h1>
            <p className="text-2xl text-flex-furniture-950 font-light leading-relaxed tracking-wide">
              We have sent you a verification token on your email{" "}
              <span className="font-medium">rushighodke01@gmail.com</span>.
            </p>
            {time === 0 ? (
              <div className="w-full flex items-center justify-center gap-2">
                <p className="text-3xl text-flex-furniture-950 font-light">
                  Verification time expires.
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
                Verification Token
              </label>
              <div className="w-full h-24">
                <input
                  type="text"
                  name="verification-token"
                  id="verification-token"
                  placeholder="Enter Verification Token"
                  className="w-full h-full px-5 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal border border-slate-200 rounded-2xl focus:border-flex-furniture-950 valid:border-flex-furniture-950 transition-all duration-300 ease-in-out"
                  required
                />
              </div>
            </div>
            <div className="w-full h-24">
              <input
                type="submit"
                value="Verify"
                className="w-full h-full border border-flex-furniture-950 text-flex-furniture-950 text-3xl font-semibold rounded-2xl cursor-pointer hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
