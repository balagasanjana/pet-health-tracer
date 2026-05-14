const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Your MongoDB model

// Signup route
router.post("/signup", async (req, res) => {
  const { name, contactNumber, pet, address, password, license } = req.body;

  if (!name || !contactNumber || !pet || !address || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const newUser = new User({
      name,
      contactNumber,
      pet,
      address,
      password,
      license,
    });
    await newUser.save();
    res.status(200).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Database error" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required." });
  }

  try {
    const user = await User.findOne({ name });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    if (user.password !== password) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password." });
    }

    res.status(200).json({ success: true, user });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
});

module.exports = router;
