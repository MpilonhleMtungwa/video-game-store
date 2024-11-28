export const fetchGameDetailsById = async (gameId) => {
  try {
    // Fetch game details from RAWG API
    const rawgResponse = await fetch(
      `https://api.rawg.io/api/games/${gameId}?key=${process.env.REACT_APP_RAWG_API_KEY}`
    );
    const rawgData = await rawgResponse.json();

    // Fetch game price from CheapShark API
    const cheapSharkResponse = await fetch(
      `https://www.cheapshark.com/api/1.0/deals?title=${rawgData.name}`
    );
    const priceData = await cheapSharkResponse.json();

    // Combine game details and price data
    return {
      title: rawgData.name,
      description: rawgData.description,
      imageUrl: rawgData.background_image,
      trailerUrl: rawgData.clip?.clip,
      rating: rawgData.rating,
      price: priceData[0]?.salePrice || "N/A",
      originalPrice: priceData[0]?.normalPrice || "N/A",
    };
  } catch (error) {
    console.error("Error fetching game details:", error);
    return null;
  }
};
