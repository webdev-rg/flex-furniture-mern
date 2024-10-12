const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productQuantity: { type: Number, required: true },
  productImage: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("carts", CartSchema);
