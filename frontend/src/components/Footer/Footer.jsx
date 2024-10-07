import React from "react";
import {
  RiFacebookLine,
  RiTwitterLine,
  RiInstagramLine,
  RiPinterestLine,
  RiCopyrightLine,
} from "react-icons/ri";
import paymentImg from "/images/payment.png";

export const Footer = () => {
  return (
    <>
      <div className="w-full py-20 px-10 flex justify-center border-t">
        <div className="w-full flex flex-col items-center justify-center gap-10 text-center">
          <h1 className="sm:text-5xl text-4xl font-bold tracking-wide">
            SIGNUP FOR EMAILS
          </h1>
          <p className="sm:text-3xl text-2xl">
            Enjoy 15% off* your first order when you sign up to our newsletter
          </p>
          <form className="md:w-1/2 w-full flex items-center">
            <div className="w-full">
              <input
                type="email"
                name="subscribe-for-emails"
                id="subscribe-for-emails"
                placeholder="Your e-mail address"
                className="w-full sm:h-24 h-20 px-10 text-2xl font-semibold placeholder:font-normal bg-[#ededed]"
              />
            </div>
            <button className="w-72 sm:h-24 h-20 bg-[#020d19] text-white text-2xl tracking-wide">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </div>
      <footer className="w-full lg:px-32 px-10 py-20">
        <div className="w-full grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          <div className="w-full flex flex-col gap-10">
            <h2 className="text-3xl font-bold tracking-wide">CONTACT US</h2>
            <ul className="flex flex-col gap-7">
              <li className="text-2xl text-[#848484] tracking-wider">
                Tel:(234)23-45-666
              </li>
              <li className="text-2xl text-[#848484] tracking-wider">
                Mon-Fri: 8am – 8pm
              </li>
              <li className="text-2xl text-[#848484] tracking-wider">
                Sat-Sun: 8am – 7pm
              </li>
            </ul>
          </div>
          <div className="w-full flex flex-col gap-10">
            <h2 className="text-3xl font-bold tracking-wide">DESIGN SERVICE</h2>
            <ul className="flex flex-col gap-7">
              <li className="text-2xl text-[#848484] tracking-wider hover:text-[#d10202] transition-all duration-300 ease-in-out">
                Interior Design
              </li>
              <li className="text-2xl text-[#848484] tracking-wider hover:text-[#d10202] transition-all duration-300 ease-in-out">
                Room Planner
              </li>
              <li className="text-2xl text-[#848484] tracking-wider hover:text-[#d10202] transition-all duration-300 ease-in-out">
                Our Projects
              </li>
              <li className="text-2xl text-[#848484] tracking-wider hover:text-[#d10202] transition-all duration-300 ease-in-out">
                Design Chat
              </li>
            </ul>
          </div>
          <div className="w-full flex flex-col gap-10">
            <h2 className="text-3xl font-bold tracking-wide">About</h2>
            <ul className="flex flex-col gap-7">
              <li className="text-2xl text-[#848484] tracking-wider hover:text-[#d10202] transition-all duration-300 ease-in-out">
                Our Story
              </li>
              <li className="text-2xl text-[#848484] tracking-wider hover:text-[#d10202] transition-all duration-300 ease-in-out">
                Careers
              </li>
              <li className="text-2xl text-[#848484] tracking-wider hover:text-[#d10202] transition-all duration-300 ease-in-out">
                Influencers
              </li>
              <li className="text-2xl text-[#848484] tracking-wider hover:text-[#d10202] transition-all duration-300 ease-in-out">
                Join our team
              </li>
            </ul>
          </div>
          <div className="w-full flex flex-col gap-10">
            <h2 className="text-3xl font-bold tracking-wide">CLIENT SERVICE</h2>
            <ul className="flex flex-col gap-7">
              <li className="text-2xl text-[#848484] tracking-wider hover:text-[#d10202] transition-all duration-300 ease-in-out">
                Contact Us
              </li>
              <li className="text-2xl text-[#848484] tracking-wider hover:text-[#d10202] transition-all duration-300 ease-in-out">
                Customer Service
              </li>
              <li className="text-2xl text-[#848484] tracking-wider hover:text-[#d10202] transition-all duration-300 ease-in-out">
                Find Store
              </li>
              <li className="text-2xl text-[#848484] tracking-wider hover:text-[#d10202] transition-all duration-300 ease-in-out">
                Shipping & Returns
              </li>
            </ul>
          </div>
        </div>
      </footer>
      <div className="w-full flex sm:flex-row flex-col items-center justify-between gap-10 border-t-[1px] py-10 lg:px-32 px-10">
        <div className="flex items-center gap-5">
          <RiFacebookLine className="text-4xl hover:text-[#d10202] transition-all duration-300 ease-in-out" />
          <RiTwitterLine className="text-4xl hover:text-[#d10202] transition-all duration-300 ease-in-out" />
          <RiInstagramLine className="text-4xl hover:text-[#d10202] transition-all duration-300 ease-in-out" />
          <RiPinterestLine className="text-4xl hover:text-[#d10202] transition-all duration-300 ease-in-out" />
        </div>
        <div>
          <p className="flex items-center gap-2 text-2xl text-[#848484]">
            <RiCopyrightLine /> Flex Furniture. All rights reserved
          </p>
        </div>
        <div>
          <img src={paymentImg} className="w-72" alt="" />
        </div>
      </div>
    </>
  );
};
