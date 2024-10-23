const express = require("express");
const cors = require("cors");
require("./config");
const adminRoute = require("./routes/adminRoute");
const categoryRoute = require("./routes/categoryRoute");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const cartRoute = require("./routes/cartRoute");
const orderRoute = require("./routes/orderRoute");

const app = express();
const PORT = 1901;

app.use(cors());
app.use(express.json());

//? Admin API
app.use("/api", adminRoute);

//? Category API
app.use("/api", categoryRoute);

//? Products API
app.use("/api", productRoute);

//? Users API
app.use("/api", userRoute);

//? Cart API
app.use("/api", cartRoute);

//? Oder API
app.use("/api", orderRoute);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
