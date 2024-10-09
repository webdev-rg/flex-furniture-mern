const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: Buffer, required: true }],
  price: { type: Number, required: true },
  discount: { type: Number, required: true },
  rating: { type: Number, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
});

module.exports = mongoose.model("products", productSchema);
