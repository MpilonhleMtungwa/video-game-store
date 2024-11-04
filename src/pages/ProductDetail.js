import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams(); // use id from useParams
  const [game, setGame] = useState(null);
  const [price, setPrice] = useState(null); // New state to store price data

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        // Fetch basic game details from RAWG
        const rawgResponse = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${process.env.REACT_APP_RAWG_API_KEY}`
        );
        const rawgData = await rawgResponse.json();

        // Fetch pricing data from CheapShark based on the game's title
        const cheapSharkResponse = await fetch(
          `https://www.cheapshark.com/api/1.0/deals?title=${rawgData.name}`
        );
        const cheapSharkData = await cheapSharkResponse.json();

        // Assuming you want the lowest price deal from the CheapShark response
        const lowestPriceDeal = cheapSharkData[0]?.salePrice || "N/A";

        // Combine RAWG and pricing data
        setGame({
          title: rawgData.name,
          description: rawgData.description,
          imageUrl: rawgData.background_image,
          trailerUrl: rawgData.clip?.clip,
          rating: rawgData.rating,
        });

        setPrice(lowestPriceDeal); // Set the price data
      } catch (error) {
        console.error("Failed to fetch game details", error);
      }
    };

    fetchGameDetails();
  }, [id]); // Pass id instead of gameId

  if (!game) return <div>Loading...</div>;
  return (
    <div className={styles.productDetailContainer}>
      <h1 className={styles.gameTitle}>{game.name}</h1>
      <div className={styles.gameHeader}>
        <span className={styles.rating}>⭐ {game.rating}</span>
        <span className={styles.highlight}>Great for Beginners</span>
        <span className={styles.highlight}>Great Boss Battles</span>
      </div>

      <div className={styles.contentContainer}>
        {/* Media Section */}
        <div className={styles.mediaSection}>
          {game.trailerUrl ? (
            <video
              src={game.trailerUrl}
              controls
              className={styles.gameTrailer}
            />
          ) : (
            <img
              src={game.imageUrl}
              alt={game.name}
              className={styles.gameImage}
            />
          )}
        </div>

        {/* Purchase Section */}
        <div className={styles.purchaseSection}>
          <p className={styles.gamePrice}>ZAR {game.price}</p>
          <button className={styles.buyButton}>Buy Now</button>
        </div>
      </div>

      {/* Tabs for Overview and Add-Ons */}
      <div className={styles.tabs}>
        <button className={styles.tabButton}>Overview</button>
        <button className={styles.tabButton}>Add-Ons</button>
      </div>
      <div className={styles.tabContent}>
        {/* This would dynamically show content based on the selected tab */}
        <p>{game.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
