import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ProductCard.module.css";

const calculatePrice = (releaseYear) => {
  if (releaseYear >= 2022) return 899;
  if (releaseYear >= 2018) return 599;
  if (releaseYear >= 2010) return 299;
  if (releaseYear >= 2000) return 149;
  return 100;
};

const ProductCard = ({ game }) => {
  const {
    id,
    name,
    background_image,
    category,

    priceBeforeDiscountZAR,
    discount,
  } = game;

  const releaseDate = game.released || game.releaseDate; // Adjust based on the property name in your data
  const releaseYear = releaseDate ? new Date(releaseDate).getFullYear() : null;

  // Check if the releaseYear was calculated correctly
  const priceZAR = releaseYear
    ? calculatePrice(releaseYear)
    : "Price not available";

  return (
    <Link to={`/game/${game.id}`} className={styles.cardLink}>
      <div className={styles.cardContainer}>
        <div className={styles.imageContainer}>
          <img src={background_image} alt={name} className={styles.gameImage} />
        </div>
        <div className={styles.category}>{category}</div>
        <h3 className={styles.title}>{name}</h3>

        <div className={styles.priceSection}>
          {discount && priceBeforeDiscountZAR ? (
            <>
              <span className={styles.discount}>{discount}% OFF</span>
              <span className={styles.priceBeforeDiscount}>
                ZAR {priceBeforeDiscountZAR}
              </span>
              <span className={styles.price}>R {priceZAR}</span>
            </>
          ) : (
            <span className={styles.price}>
              {priceZAR ? `R ${priceZAR}` : "Free"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
