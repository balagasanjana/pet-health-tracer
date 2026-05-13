const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  pet: { type: String, required: true },
  address: { type: String, required: true },
  password: { type: String, required: true },
  license: { type: Boolean, default: false },
});

module.exports = mongoose.model("User", userSchema);
