import React, { useContext, useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";
import { Data } from "../DataProvider/DataProvider";
import Preloader from "../Preloader/PreLoader";

export const Layout = () => {
  const { isUserLoggedIn, cartDetails } = useContext(Data);

  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true); // Show the preloader on route change
    const timer = setTimeout(() => {
      setIsLoading(false); // Hide the preloader after 1 second
    }, 1000);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [location]);

  return (
    <>
      <Header isUserLoggedIn={isUserLoggedIn} cartDetails={cartDetails} />
      <Preloader isLoading={isLoading} />
      <Outlet />
      <Footer />
    </>
  );
};
