import axios from "axios";

const RAWG_API_BASE_URL = "https://api.rawg.io/api/games";

export const fetchGameDetails = async (category = "") => {
  try {
    // Configure ordering for "most popular" and "recently updated"
    let ordering;
    if (category === "most_popular") {
      ordering = "-metacritic"; // Sort by Metacritic score
    } else if (category === "recently_updated") {
      ordering = "-updated"; // Sort by most recently updated
    } else {
      ordering = ""; // For genre categories
    }
    const requestUrl = `${RAWG_API_BASE_URL}?key=${process.env.REACT_APP_RAWG_API_KEY}&genres=${category}&page_size=10`;
    console.log("Request URL:", requestUrl); // Log full request URL

    const response = await axios.get(RAWG_API_BASE_URL, {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
        genres:
          category === "most_popular" || category === "recently_updated"
            ? undefined
            : category,
        ordering: ordering || undefined,
        page_size: 4,
      },
    });

    console.log("RAWG API Full Response:", response); // Logs full response object

    // Filter out adult games
    const nonAdultGames = response.data.results.filter(
      (game) => !game.esrb_rating || game.esrb_rating.name !== "Adults Only"
    );

    return nonAdultGames;
  } catch (error) {
    console.error(
      "Error fetching game details from RAWG:",
      error.response?.data || error.message
    );
    return [];
  }
};
