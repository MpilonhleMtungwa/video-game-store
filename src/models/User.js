// models/User.js
const mongoose = require("mongoose");

// User schema model mongodb database
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishlist: [
    {
      id: { type: Number, required: true }, // Game ID from RAWG
      title: { type: String, required: true }, // Game title
      price: { type: Number, required: true }, // Price of the game
      image: { type: String }, // Game image URL
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
