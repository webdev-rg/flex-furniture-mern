import React, { useEffect, useState } from "react";
// import data from "/shop.json";

const ProductList = () => {
  // console.log(data);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/movies.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);
  return (
    <div>
      {products.slice(0, 6).map((item) => (
        <div key={item._id.$oid}>
          <h3 style={{ fontSize: "25px" }}>{item.title}</h3>
          {item.poster ? (
            <img
              src={item.poster}
              alt={item.title}
              style={{ width: "200px", height: "auto" }}
            />
          ) : (
            <p style={{fontSize: "20px"}}>No Image Available</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
