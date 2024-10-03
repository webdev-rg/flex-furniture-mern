const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  categoryImage: { type: Buffer },
  contentType: String,
  productCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("categories", CategorySchema);
