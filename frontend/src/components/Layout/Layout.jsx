import React, { useContext } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Data } from "../DataProvider/DataProvider";

export const Layout = () => {
  const { isUserLoggedIn } = useContext(Data);

  return (
    <>
      <Header isUserLoggedIn={isUserLoggedIn} />
      <Outlet />
      <Footer />
    </>
  );
};
