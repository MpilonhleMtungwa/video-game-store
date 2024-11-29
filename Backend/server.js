require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

const authRoutes = require("./routes/auth");
const wishlistRoutes = require("./routes/wishlistRoutes");

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set up routes
app.use("/auth", authRoutes);
app.use("/api", wishlistRoutes);

app.get("/api/game-details", async (req, res) => {
  try {
    const response = await fetch(`${proxyUrl}${apiUrl}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

// RAWG API endpoint
app.get("/api/games", async (req, res) => {
  try {
    const url = `${process.env.RAWG_API_BASE_URL}/games`;
    console.log("Full URL for RAWG request:", url);
    console.log("With key:", process.env.REACT_APP_RAWG_API_KEY);

    const { data } = await axios.get(url, {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
        page_size: 10,
        ordering: "-rating",
      },
    });
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from RAWG:", error);
    res.status(500).json({ error: "Failed to fetch data from RAWG" });
  }
});

// CheapShark API endpoint
app.get("/api/prices", async (req, res) => {
  try {
    const { title } = req.query; // Assume game title is passed as a query parameter
    const { data } = await axios.get(
      `${process.env.CHEAPSHARK_API_BASE_URL}/games`,
      {
        params: {
          title, // Search by game title
          limit: 1, // Limit results to the top match
        },
      }
    );
    res.json(data);
  } catch (error) {
    console.error("Error fetching data from CheapShark:", error);
    res.status(500).json({ error: "Failed to fetch data from CheapShark" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
