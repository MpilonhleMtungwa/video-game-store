import axios from "axios";

// Function to fetch game data from RAWG API
export const fetchRawgGameData = async (id = "") => {
  try {
    const response = await fetch(
      `https://api.rawg.io/api/games${id ? `/${id}` : ""}?key=${
        process.env.REACT_APP_RAWG_API_KEY
      }`
    );
    const data = await response.json();

    return id
      ? {
          title: data.name,
          description: data.description_raw,
          rating: data.rating,
          developer: data.developers?.[0]?.name || "Unknown",
          publisher: data.publishers?.[0]?.name || "Unknown",
          releaseDate: data.released,
          platform:
            data.platforms?.map((p) => p.platform.name).join(", ") || "Unknown",
          priceZAR: data.price || "N/A", // Mock price field for demo
        }
      : data.results.map((game) => ({
          id: game.id,
          name: game.name,
          background_image: game.background_image,
          priceZAR: game.price || "N/A", // Mock price field for demo
        }));
  } catch (error) {
    console.error("Failed to fetch RAWG game data:", error);
    throw error;
  }
};
// Function to fetch price data from Steam API
export const fetchSteamPriceData = async (appId) => {
  try {
    const response = await axios.get(
      `https://store.steampowered.com/api/appdetails?appids=${appId}`
    );
    const priceData = response.data[appId]?.data?.price_overview;
    return priceData
      ? { price: priceData.final / 100, currency: priceData.currency }
      : null;
  } catch (error) {
    console.error("Error fetching price from Steam:", error);
    return null;
  }
};
