import axios from "axios";

const RAWG_API_BASE_URL = "https://api.rawg.io/api/games";

export const fetchGameDetails = async (category = "") => {
  try {
    // Get today's date and calculate the date 30 days ago
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 7);
    const startDate = thirtyDaysAgo.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    // Configure ordering for "most popular" and "recently updated"
    let ordering;
    let dateFilter = undefined;
    if (category === "most_popular") {
      ordering = "-metacritic"; // Sort by Metacritic score
    } else if (category === "recently_updated") {
      ordering = "-updated"; // Sort by most recently updated
      dateFilter = `${startDate},${today}`; // Filter for games updated in the last 30 days
    } else {
      ordering = ""; // For genre categories
    }

    // Make the API request
    const response = await axios.get(RAWG_API_BASE_URL, {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
        genres:
          category === "most_popular" || category === "recently_updated"
            ? undefined
            : category,
        ordering: ordering || undefined,
        page_size: 4,
        dates: dateFilter || undefined, // Include the date range for recently updated
        esrb_rating: "everyone,teen,mature", // Exclude adult games
      },
    });

    console.log("RAWG API Full Response:", response); // Logs full response object

    // Return the results directly
    return response.data.results;
  } catch (error) {
    console.error(
      "Error fetching game details from RAWG:",
      error.response?.data || error.message
    );
    return [];
  }
};
