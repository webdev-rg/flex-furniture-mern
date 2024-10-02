import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./components/Home/Home";
import { About } from "./components/About/About";
import { Shop } from "./components/Shop/Shop";
import { Contact } from "./components/Contact/Contact";
import { Signin } from "./components/Signin/Signin";
import { Signup } from "./components/Signup/Signup";
import { Product } from "./components/Product/Product";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="shop/product-category/:category" element={<Shop />} />
          <Route path="shop/product/:productname/:productid" element={<Product />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signin" element={<Signin />} />
          <Route path="signup" element={<Signup />} />
          {/* <Route path="product-category/:category" element={<ProductByCategory />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
