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
import { Cart } from "./components/Cart/Cart";
import { Dashboard } from "./components/Dashboard/Dashboard";
import { MyProfile } from "./components/MyProfile/MyProfile";
import { OrderList } from "./components/OrderList/OrderList";
import { Settings } from "./components/Settings/Settings";
import { useContext } from "react";
import { Data } from "./components/DataProvider/DataProvider";

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
            path="shop/product/:productName/category/:categoryName/:productId"
            element={<Product />}
          />
          <Route path="contact" element={<Contact />} />
          <Route
            path="cart"
            element={isUserLoggedIn ? <Cart /> : <Navigate to="/signin" />}
          />
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
            path="/dashboard"
            element={
              isUserLoggedIn === true ? (
                <Dashboard />
              ) : (
                <Navigate to="/signin" />
              )
            }
          >
            <Route path="myprofile" element={<MyProfile />} />
            <Route path="orders" element={<OrderList />} /> 
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
