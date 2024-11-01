const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// RAWG API endpoint
app.get("/api/games", async (req, res) => {
  try {
    const { data } = await axios.get(`${process.env.RAWG_API_BASE_URL}/games`, {
      params: {
        key: process.env.RAWG_API_KEY,
        page_size: 10, // Set the number of results you want to fetch
        ordering: "-rating" // Order by rating, can be customized
      }
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
    const { data } = await axios.get(`${process.env.CHEAPSHARK_API_BASE_URL}/games`, {
      params: {
        title, // Search by game title
        limit: 1 // Limit results to the top match
      }
    });
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
