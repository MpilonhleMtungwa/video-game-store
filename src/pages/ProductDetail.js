import React, { useState, useEffect } from "react";
import styles from "../styles/ProductDetail.module.css";

const ProductDetail = ({ gameId }) => {
  const [game, setGame] = useState({});

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const rawgResponse = await fetch(
          `https://api.rawg.io/api/games/${gameId}?key=YOUR_RAWG_API_KEY`
        );
        const rawgData = await rawgResponse.json();

        // Fetch pricing from Epic Games or another source
        const epicResponse = await fetch(
          `https://epic-games-store-api.com/api/pricing/${gameId}`
        );
        const epicData = await epicResponse.json();

        // Combine RAWG and pricing data
        setGame({
          title: rawgData.name,
          description: rawgData.description,
          imageUrl: rawgData.background_image,
          trailerUrl: rawgData.clip?.clip,
          rating: rawgData.rating,
          price: epicData.price || "N/A",
        });
      } catch (error) {
        console.error("Failed to fetch game details", error);
      }
    };

    fetchGameDetails();
  }, [gameId]);

  if (!game) return <div>Loading...</div>;

  return (
    <div className="productDetailContainer">
      <h1 className="gameTitle">{game.name}</h1>
      <div className="gameHeader">
        <span className="rating">⭐ {game.rating}</span>
        <span className="highlight">Great for Beginners</span>
        <span className="highlight">Great Boss Battles</span>
      </div>

      <div className="contentContainer">
        {/* Media Section */}
        <div className="mediaSection">
          {game.trailerUrl ? (
            <video src={game.trailerUrl} controls className="gameTrailer" />
          ) : (
            <img src={game.imageUrl} alt={game.name} className="gameImage" />
          )}
        </div>

        {/* Purchase Section */}
        <div className="purchaseSection">
          <p className="gamePrice">ZAR {game.price}</p>
          <button className="buyButton">Buy Now</button>
        </div>
      </div>

      {/* Tabs for Overview and Add-Ons */}
      <div className="tabs">
        <button className="tabButton">Overview</button>
        <button className="tabButton">Add-Ons</button>
      </div>
      <div className="tabContent">
        {/* This would dynamically show content based on the selected tab */}
        <p>{game.description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
