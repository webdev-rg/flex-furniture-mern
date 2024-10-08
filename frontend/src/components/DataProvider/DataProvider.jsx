import React, { createContext, useEffect, useState } from "react";

export const Data = createContext();

export const DataProvider = ({ children }) => {
  const URL = "https://flex-furniture-server.onrender.com";
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => {
    return localStorage.getItem("userLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("userLoggedIn", isUserLoggedIn);
  }, [isUserLoggedIn]);
  return (
    <Data.Provider value={{ isUserLoggedIn, setIsUserLoggedIn, URL }}>
      {children}
    </Data.Provider>
  );
};
