// models/User.js
const mongoose = require("mongoose");

// User schema model mongodb database
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    wishlist: {
      type: [
        {
          id: { type: String, required: true }, // Game ID or unique identifier
          title: { type: String, required: true }, // Game title
          image: { type: String }, // Game image URL
          price: { type: Number, required: true }, // Price of the game
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
