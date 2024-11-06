import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "../styles/ProductGrid.module.css";

const USD_TO_ZAR_API_URL = "https://api.exchangerate-api.com/v4/latest/USD"; // Replace with your API URL

const ProductGrid = ({ games }) => {
  const [gamesWithPrices, setGamesWithPrices] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(18); // Default rate

  useEffect(() => {
    // Fetch the exchange rate from the currency API
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(USD_TO_ZAR_API_URL);
        const data = await response.json();
        setExchangeRate(data.rates.ZAR); // Set ZAR exchange rate
      } catch (error) {
        console.error("Failed to fetch exchange rate", error);
      }
    };

    fetchExchangeRate();
  }, []);

  useEffect(() => {
    const fetchAllPrices = async () => {
      try {
        const updatedGames = await Promise.all(
          games.map(async (game) => {
            const cheapSharkResponse = await fetch(
              `https://www.cheapshark.com/api/1.0/deals?title=${game.name}`
            );
            const cheapSharkData = await cheapSharkResponse.json();

            const lowestPriceDeal = cheapSharkData[0]?.salePrice || "N/A";
            const priceInZAR =
              lowestPriceDeal !== "N/A"
                ? (lowestPriceDeal * exchangeRate).toFixed(2)
                : "N/A";

            return {
              ...game,
              priceZAR: priceInZAR, // Set the price in ZAR
            };
          })
        );
        setGamesWithPrices(updatedGames);
      } catch (error) {
        console.error("Failed to fetch prices for games", error);
      }
    };

    fetchAllPrices();
  }, [games, exchangeRate]);

  return (
    <div className={styles.gridContainer}>
      {gamesWithPrices.map((game) => (
        <ProductCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default ProductGrid;
