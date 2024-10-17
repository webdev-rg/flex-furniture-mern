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
  const [cartDetails, setCartDetails] = useState([]);
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

  const handleGetCartDetails = async (userId) => {
    try {
      const response = await fetch(`${URL}/api/getcartdetails/${userId}`);

      const data = await response.json();

      if (data.message === "Cart details not found") {
        setCartDetails([]);
      } else if (data.message === "Cart details") {
        setCartDetails(data.cartData);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (userData && userData._id) handleGetCartDetails(userData._id);
  }, [cartDetails]);

  return (
    <Data.Provider
      value={{
        isUserLoggedIn,
        setIsUserLoggedIn,
        updatedUserDetails,
        setUpdatedUserDetails,
        loading,
        setLoading,
        cartDetails,
        handleGetCartDetails,
        URL,
        user,
        userData,
        products,
        setProducts,
        handleGetUser,
        handleGetProducts,
      }}
    >
      {children}
    </Data.Provider>
  );
};
