const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productPrice: { type: Number, required: true },
  productQuantity: { type: Number, required: true },
  productImage: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userAddress: { type: String, required: true },
});

module.exports = mongoose.model("orders", OrderSchema);
