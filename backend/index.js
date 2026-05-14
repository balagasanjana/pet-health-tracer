const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();

// Environment variables
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "https://balagasanjana.github.io";
const NODE_ENV = process.env.NODE_ENV || "development";

// CORS Configuration
app.use(cors({ 
  origin: CORS_ORIGIN.split(",").map(url => url.trim()),
  credentials: true 
}));

app.use(express.json());

// DB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes); // ✅ this line expects authRoutes to be a router

// Health check endpoint for Render
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", environment: NODE_ENV });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});
