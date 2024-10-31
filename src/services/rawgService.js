// Import axios for HTTP requests
import axios from "axios";

const RAWG_BASE_URL = "https://api.rawg.io/api/games";

export const fetchGameDetails = async (query) => {
  try {
    const response = await axios.get(RAWG_BASE_URL, {
      params: {
        key: process.env.REACT_APP_RAWG_API_KEY,
        search: query,
        page_size: 10, // Number of games to fetch
      },
    });
    return response.data.results; // Returns an array of games
  } catch (error) {
    console.error("Error fetching game details from RAWG", error);
    return [];
  }
};
