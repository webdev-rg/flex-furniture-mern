const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  adminEmail: { type: String, required: true, unique: true },
  adminPassword: { type: String, required: true },
});

module.exports = mongoose.model("admin", AdminSchema);
