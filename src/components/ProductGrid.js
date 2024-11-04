import React from "react";
import ProductCard from "./ProductCard";
import styles from "../styles/ProductGrid.module.css";

const ProductGrid = ({ games }) => {
  return (
    <div className={styles.gridContainer}>
      {games?.map((game, index) => (
        <ProductCard key={index} game={game} />
      ))}
    </div>
  );
};

export default ProductGrid;
