import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "../styles/ProductGrid.module.css";
import { fetchRawgGameData, fetchSteamPriceData } from "../Api/api";


// show games in a grid using product card
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
