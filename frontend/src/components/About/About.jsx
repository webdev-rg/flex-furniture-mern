import React from "react";
import { CiFacebook } from "react-icons/ci";
import {
  PiFacebookLogo,
  PiInstagramLogo,
  PiTwitterLogo,
  PiPinterestLogo,
} from "react-icons/pi";

export const About = () => {
  return (
    <div className="w-full h-full py-40">
      <div className="w-full flex flex-col items-center gap-8 py-6">
        <h1 className="text-6xl text-flex-furniture-950 font-semibold tracking-wide">
          About Flex Furniture
        </h1>
        <p className="text-4xl text-center text-[#848484] leading-relaxed">
          Flex Furniture was established in 1990, consectetur eleifend commodo
          at, consectetur
          <br /> eu justo. Sed viverra consectetur risus nec ultricies.
        </p>
      </div>
      <div className="w-full h-[70rem] py-20">
        <img
          src="/images/about-parallax-1.jpg"
          className="w-full h-full object-cover"
          alt="about-parallax-bg"
        />
      </div>
      <div className="w-full px-32 py-20 grid grid-cols-2 gap-32">
        <div className="w-full h-full">
          <div className="w-full h-full overflow-hidden group">
            <img
              src="/images/about-3.jpg"
              className="group-hover:scale-125 transition-all duration-500 ease-in-out"
              alt="about"
            />
          </div>
        </div>
        <div className="w-full h-full">
          <div className="w-full h-full py-20 flex flex-col gap-20">
            <h1 className="text-5xl text-flex-furniture-950 font-bold">
              HOW WE WORK
            </h1>
            <div className="flex flex-col gap-16">
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl text-flex-furniture-950 font-bold">
                  Production Design
                </h1>
                <p className="text-3xl text-[#848484] font-medium tracking-wide leading-relaxed">
                  Integer dignissim sagittis quam. Maecenas sem eros, rutrum
                  vitae risus eget, vulputate aliquam nisi.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl text-flex-furniture-950 font-bold">
                  Manufacturing
                </h1>
                <p className="text-3xl text-[#848484] font-medium tracking-wide leading-relaxed">
                  Maecenas sem eros, rutrum vitae risus eget, vulputate aliquam
                  nisi ex gravida neque tempus
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl text-flex-furniture-950 font-bold">
                  Marketing and Selling
                </h1>
                <p className="text-3xl text-[#848484] font-medium tracking-wide leading-relaxed">
                  Rutrum vitae risus eget, vulputate aliquam nisi ex gravida
                  neque tempus.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full grid grid-cols-4 gap-16 px-32 py-20">
        <TeamCard
          image="/images/team-1.jpg"
          desig="CEO & FOUNDER"
          name="John Hossain"
        />
        <TeamCard image="/images/team-2.jpg" desig="SALER" name="Charlotte" />
        <TeamCard
          image="/images/team-3.jpg"
          desig="GRAPHIC DESIGN"
          name="Chris Patterson"
        />
        <TeamCard
          image="/images/team-4.jpg"
          desig="MARKETING"
          name="Isabella"
        />
      </div>
      <div className="w-full grid grid-cols-6 gap-16 px-32 py-20">
        <div className="w-full">
          <img src="/images/brand-1.png" alt="brand-1" />
        </div>
        <div className="w-full">
          <img src="/images/brand-2.png" alt="brand-2" />
        </div>
        <div className="w-full">
          <img src="/images/brand-3.png" alt="brand-3" />
        </div>
        <div className="w-full">
          <img src="/images/brand-4.png" alt="brand-4" />
        </div>
        <div className="w-full">
          <img src="/images/brand-5.png" alt="brand-5" />
        </div>
        <div className="w-full">
          <img src="/images/brand-6.png" alt="brand-6" />
        </div>
      </div>
    </div>
  );
};

const TeamCard = ({ image, desig, name }) => {
  return (
    <div className="w-full h-full">
      <div className="w-full h-full flex flex-col gap-5">
        <div className="w-full h-full relative group">
          <img src={image} alt="team-1" />
          <div
            style={{ backgroundColor: "rgba(0, 0, 0, 0.65)" }}
            className="w-full h-full absolute top-0 left-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
          >
            <div className="flex items-center gap-8">
              <PiFacebookLogo className="text-5xl text-white hover:text-flex-furniture-500 transition-all duration-200 ease-in-out" />
              <PiInstagramLogo className="text-5xl text-white hover:text-flex-furniture-500 transition-all duration-200 ease-in-out" />
              <PiTwitterLogo className="text-5xl text-white hover:text-flex-furniture-500 transition-all duration-200 ease-in-out" />
              <PiPinterestLogo className="text-5xl text-white hover:text-flex-furniture-500 transition-all duration-200 ease-in-out" />
            </div>
          </div>
        </div>
        <div className="w-full h-full text-center">
          <h2 className="text-2xl text-flex-furniture-950 font-bold tracking-wide leading-relaxed">
            {desig}
          </h2>
          <h1 className="text-5xl text-[#848484] tracking-wider leading-relaxed">
            {name}
          </h1>
        </div>
      </div>
    </div>
  );
};
