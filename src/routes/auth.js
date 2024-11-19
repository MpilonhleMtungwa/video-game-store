// routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

const jwt = require("jsonwebtoken");

router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

module.exports = router;
