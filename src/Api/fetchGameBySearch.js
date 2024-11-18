export const fetchGamesBySearch = async (query) => {
  const API_KEY = process.env.REACT_APP_RAWG_API_KEY;
  const url = `https://api.rawg.io/api/games?search=${query}&key=${API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }
    const data = await response.json();
    return data.results; // Ensure this is the correct field
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};
