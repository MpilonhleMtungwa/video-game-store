export const fetchGamesBySearch = async (query) => {
  const API_KEY = process.env.REACT_APP_RAWG_API_KEY;
  const url = `https://api.rawg.io/api/games?search=${query}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch search results");
    }

    const data = await response.json();

    // Apply filters to the results
    const filteredResults = data.results.filter(
      (game) =>
        !game.esrb_rating?.name?.toLowerCase().includes("adult") && // Exclude adult games
        game.metacritic >= 40 // Only include games with a Metacritic score of 50 or higher
    );

    return filteredResults;
  } catch (error) {
    console.error("Error fetching games:", error);
    return [];
  }
};
