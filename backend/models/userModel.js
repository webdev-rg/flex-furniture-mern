const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: Number, default: 0 },
  address: { type: String, default: "" },
  image: { type: Buffer, required: false },
  contentType: { type: String, required: false },
  token: { type: String, required: false },
  tokenExpiration: { type: Date, required: false },
  isVerified: { type: Boolean, default: false },
});

module.exports = mongoose.model("users", UserSchema);
