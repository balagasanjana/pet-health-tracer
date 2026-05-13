// src/pages/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const Login = () => {
  const [formData, setFormData] = useState({ name: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const res = await axios.post(
        `${apiUrl}/api/auth/login`,
        formData
      );
      if (res.data.success) {
        // Save user data locally
        localStorage.setItem("user", JSON.stringify(res.data.user));
        alert("Login successful!");
        navigate("/"); // Redirect to Home
      } else {
        alert("Invalid credentials!");
      }
    } catch (err) {
      console.error("Login Error:", err);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2
            className="text-2xl font-bold text-center text-blue-600 mb-6"
            style={{
              textAlign: "center",
              backgroundColor: "#fd7e14",
              padding: "5px",
              margin: "4px",
            }}
          >
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4 form">
            <div>
              <label className="block text-gray-700 lab">Pet Owner Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 "
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 lab">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition button"
            >
              Login
            </button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4 new">
            New user?{" "}
            <Link to="/signup" className="text-blue-500 hover:underline new">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
