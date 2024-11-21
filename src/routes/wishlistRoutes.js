const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware"); // Add your auth middleware for authentication
const router = express.Router();

// Get the user's wishlist
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id); // Assume req.user is set by authentication middleware
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.wishlist);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching wishlist", error: error.message });
  }
});

// Add an item to the user's wishlist
router.post("/", authMiddleware, async (req, res) => {
  const { gameId, title, image, price } = req.body;

  if (!gameId || !title || !price) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if the item already exists in the wishlist
    const existingItem = user.wishlist.find((item) => item.gameId === gameId);
    if (existingItem) {
      return res.status(400).json({ message: "Item already in wishlist" });
    }

    // Add the new game to the wishlist
    user.wishlist.push({ gameId, title, image, price });
    await user.save();

    res.status(200).json(user.wishlist);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding to wishlist", error: error.message });
  }
});

// Remove an item from the user's wishlist
router.delete("/:gameId", authMiddleware, async (req, res) => {
  const { gameId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove the game from the wishlist
    user.wishlist = user.wishlist.filter((item) => item.gameId !== gameId);
    await user.save();

    res.status(200).json(user.wishlist);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error removing from wishlist", error: error.message });
  }
});
