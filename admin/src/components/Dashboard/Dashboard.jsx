import React from "react";
import { Header } from "../Header/Header";

export const Dashboard = () => {
  return (
    <>
      <Header />
      <div className="w-full h-screen pt-32 flex justify-between">
        <div className="w-[20%]"></div>
        <div className="w-[80%]"></div>
      </div>
    </>
  );
};
