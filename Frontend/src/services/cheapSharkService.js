import axios from "axios";

const CHEAPSHARK_BASE_URL = "https://www.cheapshark.com/api/1.0";

export const fetchGamePrices = async (title) => {
  try {
    const response = await axios.get(`${CHEAPSHARK_BASE_URL}/deals`, {
      params: {
        title: title,
        storeID: 1, // Optional: specify store (1 = Steam)
        pageSize: 5, // Optional: number of results to fetch
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching game prices from CheapShark", error);
    return [];
  }
};
