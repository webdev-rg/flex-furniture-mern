const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: { type: Buffer },
  contentType: String,
  productCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("categories", CategorySchema);
