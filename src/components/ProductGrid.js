import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "../styles/ProductGrid.module.css";
import { fetchRawgGameData, fetchSteamPriceData } from "../Api/api";

const USD_TO_ZAR_API_URL = "https://api.exchangerate-api.com/v4/latest/USD"; // Replace with your API URL

const ProductGrid = ({ games }) => {
  return (
    <div className={styles.gridContainer}>
      {games.map((game) => (
        <ProductCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default ProductGrid;
