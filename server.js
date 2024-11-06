require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

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
