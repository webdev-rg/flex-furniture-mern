import React, { createContext, useEffect, useState } from "react";

export const Data = createContext();

export const DataProvider = ({ children }) => {
  const URL = "https://flex-furniture-server.onrender.com";
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(() => {
    return localStorage.getItem("userLoggedIn") === "true";
  });
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatedUserDetails, setUpdatedUserDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: 0,
    address: "",
    image: null,
  });
  const [products, setProducts] = useState([]);
  const userData = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    localStorage.setItem("userLoggedIn", isUserLoggedIn);
  }, [isUserLoggedIn]);

  const handleGetUser = async () => {
    try {
      const response = await fetch(`${URL}/api/userdetails`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: userData.email }),
      });

      const data = await response.json();

      if (data.message === "User not found") {
        alert(`${data.message}`);
      } else if (data.message === "User found") {
        setUser(data.userDetails);
        setUpdatedUserDetails({
          firstName: data.userDetails.firstName,
          lastName: data.userDetails.lastName,
          email: data.userDetails.email,
          phoneNumber: data.userDetails.phoneNumber,
          address: data.userDetails.address,
          image: data.userDetails.image,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleGetProducts = async () => {
      try {
        const response = await fetch(`${URL}/api/getproducts`);
        const data = await response.json();

        if (data.message === "Failed to fetch products") {
          alert(`${data.message}`);
        } else if (data.message === "Products") {
          setProducts(data.productData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    handleGetProducts();
  }, []);

  return (
    <Data.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        updatedUserDetails,
        setUpdatedUserDetails,
        loading,
        setLoading,
        URL,
        user,
        userData,
        products,
        handleGetUser,
      }}
    >
      {children}
    </Data.Provider>
  );
};
