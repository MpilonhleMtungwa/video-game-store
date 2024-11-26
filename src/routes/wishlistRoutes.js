const express = require("express");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddlewear"); // Add your auth middleware for authentication
const router = express.Router();

// Get the user's wishlist
router.get("/wishlist", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user's ID

    // Find the user and return their wishlist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.wishlist); // Send back the user's wishlist
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    res
      .status(500)
      .json({ message: "Error fetching wishlist", error: error.message });
  }
});

// Add an item to the user's wishlist
router.post("/wishlist", authMiddleware, async (req, res) => {
  try {
    const { game } = req.body; // Extract the game object from the request body
    const userId = req.user.id; // Assuming `req.user.id` comes from a logged-in user (authenticated)

    // Find the user and add the game to their wishlist
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the game is already in the wishlist
    if (user.wishlist.some((item) => item.id === game.id)) {
      return res.status(400).json({ message: "Game already in wishlist" });
    }

    // Add the game to the wishlist
    user.wishlist.push(game);
    await user.save();

    res.status(200).json({ message: "Game added to wishlist" });
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    res
      .status(500)
      .json({ message: "Error adding game to wishlist", error: error.message });
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

module.exports = router;
