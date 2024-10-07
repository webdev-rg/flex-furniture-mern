const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  address: { type: String, required: false },
  otp: { type: String, required: false },
  otpExpiration: { type: Date, required: false },
  isVerified: { type: Boolean, default: false },
  cart: { type: Object, required: false },
});

module.exports = mongoose.model("users", UserSchema);
