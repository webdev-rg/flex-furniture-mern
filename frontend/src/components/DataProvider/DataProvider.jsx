import React, { createContext, useEffect, useState } from "react";

export const Data = createContext();

export const DataProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => {
    return localStorage.getItem("userLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("userLoggedIn", isUserLoggedIn);
  }, [isUserLoggedIn]);
  return (
    <Data.Provider value={{ isUserLoggedIn, setIsUserLoggedIn }}>
      {children}
    </Data.Provider>
  );
};
