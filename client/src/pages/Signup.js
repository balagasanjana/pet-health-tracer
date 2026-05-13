import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    contactNumber: "",
    pet: "",
    address: "",
    password: "",
    license: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
      const response = await axios.post(
        `${apiUrl}/api/auth/signup`,
        formData
      );

      if (response.data.message === "Signup successful") {
        alert("Signup successful! Please login.");
        navigate("/login");
      } else {
        alert("Signup failed.");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || "Signup failed.";
      console.error("Signup Error:", message);
      alert("Signup failed: " + message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-6">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Pet Owner Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="contactNumber"
            placeholder="Contact Number"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="pet"
            placeholder="Pet Type"
            value={formData.pet}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-2 border border-gray-300 rounded"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name="license"
              checked={formData.license}
              onChange={handleChange}
            />
            I agree to the pet license terms
          </label>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Create Account
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
