import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./components/Home/Home";
import { About } from "./components/About/About";
import { Shop } from "./components/Shop/Shop";
import { Contact } from "./components/Contact/Contact";
import { Signin } from "./components/Signin/Signin";
import { Signup } from "./components/Signup/Signup";
import { Product } from "./components/Product/Product";
import { Verification } from "./components/Verification/Verification";
import { useContext } from "react";
import { Data } from "./components/DataProvider/DataProvider";
import { MyProfile } from "./components/MyProfile/MyProfile";

export const App = () => {
  const { isUserLoggedIn } = useContext(Data);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="shop/product-category/:category" element={<Shop />} />
          <Route
            path="shop/product/:productname/:productid"
            element={<Product />}
          />
          <Route path="contact" element={<Contact />} />
          <Route
            path="signin"
            element={
              isUserLoggedIn === false ? <Signin /> : <Navigate to="/" />
            }
          />
          <Route
            path="signup"
            element={
              isUserLoggedIn === false ? <Signup /> : <Navigate to="/" />
            }
          />
          <Route
            path="verification"
            element={
              isUserLoggedIn === false ? <Verification /> : <Navigate to="/" />
            }
          />
          <Route
            path="/myprofile"
            element={
              isUserLoggedIn === true ? (
                <MyProfile />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
