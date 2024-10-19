import React from "react";

export const Contact = () => {
  return (
    <div className="w-full h-full">
      <div className="lg:px-32 px-5 py-40">
        <div className="w-full shadow-md lg:px-20 sm:px-14 px-6 lg:py-28 py-14 flex md:flex-row flex-col justify-between gap-20">
          <div className="md:w-[30%] w-full flex flex-col gap-20">
            <h1 className="text-6xl text-flex-furniture-950 font-bold tracking-widest">
              Contact Us
            </h1>
            <div className="w-full flex gap-14 flex-wrap">
              <div className="flex flex-col gap-4">
                <h1 className="md:text-5xl text-3xl text-flex-furniture-950 font-semibold tracking-wide">
                  Call to Us:
                </h1>
                <p className="md:text-3xl text-2xl text-[#8c8c8c] tracking-wide">
                  We’re available 24/7, 7 days a week.
                </p>
                <p className="md:text-3xl text-2xl text-flex-furniture-950 font-medium">
                  +91 7485968574
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="md:text-5xl text-3xl text-flex-furniture-950 font-semibold tracking-wide">
                  Write to Us:
                </h1>
                <p className="md:text-3xl text-2xl text-[#8c8c8c] tracking-wide">
                  Fill out our form and we will contact you within 24 hours.
                </p>
                <p className="md:text-3xl text-2xl text-flex-furniture-950 font-medium">
                  Email: support.flex24@gmail.com
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="md:text-5xl text-3xl text-flex-furniture-950 font-semibold tracking-wide">
                  Headquarter:
                </h1>
                <p className="md:text-3xl text-2xl text-[#8c8c8c] tracking-wide">
                  Monday – Friday: 9:00-20:00
                </p>
                <p className="md:text-3xl text-2xl text-[#8c8c8c] tracking-wide">
                  Saturady: 11:00 – 15:00
                </p>
                <p className="md:text-3xl text-2xl text-flex-furniture-950 font-medium">
                  123 Atlantic, Brooklyn, New York, USA
                </p>
              </div>
            </div>
          </div>
          <div className="md:w-[70%] w-full flex flex-col gap-20">
            <h1 className="sm:text-6xl text-4xl text-flex-furniture-950 font-bold tracking-widest">
              We would love to here from you.
            </h1>
            <div className="w-full">
              <form className="w-full flex flex-col gap-8">
                <div className="w-full flex sm:flex-row flex-col items-center justify-between gap-8">
                  <div className="w-full h-24">
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full h-full border border-slate-200 px-10 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal focus:border-flex-furniture-950 valid:border-flex-furniture-950"
                      required
                    />
                  </div>
                  <div className="w-full h-24">
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full h-full border border-slate-200 px-10 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal focus:border-flex-furniture-950 valid:border-flex-furniture-950"
                      required
                    />
                  </div>
                </div>
                <div className="w-full h-24">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full h-full border border-slate-200 px-10 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal focus:border-flex-furniture-950 valid:border-flex-furniture-950"
                    required
                  />
                </div>
                <div className="w-full h-72">
                  <textarea
                    type="text"
                    placeholder="Subject"
                    className="w-full h-full border border-slate-200 px-10 py-6 text-2xl text-flex-furniture-950 font-semibold placeholder:font-normal focus:border-flex-furniture-950 valid:border-flex-furniture-950"
                    required
                  ></textarea>
                </div>
                <div className="w-full h-24">
                  <input
                    type="submit"
                    value="Send Message"
                    className="w-full h-full bg-flex-furniture-950 text-white text-3xl font-medium tracking-wide cursor-pointer"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <iframe
          loading="lazy"
          className="w-full h-[55rem]"
          src="https://maps.google.com/maps?q=London%20Eye%2C%20London%2C%20United%20Kingdom&amp;t=m&amp;z=14&amp;output=embed&amp;iwloc=near"
          title="London Eye, London, United Kingdom"
          aria-label="London Eye, London, United Kingdom"
        ></iframe>
      </div>
    </div>
  );
};
