import axios from "axios";

const RAWG_API_BASE_URL = "https://api.rawg.io/api/games";

export const fetchGameDetails = async (category = "") => {
  try {
    // Get today's date
    const today = new Date();
    const todayFormatted = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD

    // Calculate date ranges for different categories
    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(today.getDate() + 7);
    const fourteenDaysLater = new Date();
    fourteenDaysLater.setDate(today.getDate() + 14);

    const sevenDaysLaterFormatted = sevenDaysLater.toISOString().split("T")[0];
    const fourteenDaysLaterFormatted = fourteenDaysLater
      .toISOString()
      .split("T")[0];

    let ordering;
    let dateFilter = undefined;

    if (category === "most_popular") {
      ordering = "-metacritic"; // Sort by Metacritic score
    } else if (category === "recently_updated") {
      ordering = "-updated"; // Sort by most recently updated
      // Adjust date filter for upcoming games
      dateFilter = `${todayFormatted},${fourteenDaysLaterFormatted}`; // Next 14 days
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
        dates: dateFilter || undefined, // Include the date range
        esrb_rating: "everyone,teen,mature", // Exclude adult games
      },
    });

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
