const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

const jwt = require("jsonwebtoken");

router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

router.post("/verify-token", (req, res) => {
  const { token } = req.body; // Extract token from the request body

  if (!token) {
    return res.status(400).json({ error: "Token is missing" });
  }

  try {
    // Verify token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true, userId: decoded.id });
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
});

module.exports = router;
