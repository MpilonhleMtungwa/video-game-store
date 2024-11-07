import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ game }) => {
  const {
    id,
    name,
    background_image,
    category,
    priceZAR,
    priceBeforeDiscountZAR,
    discount,
  } = game;

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
              <span className={styles.price}>ZAR {priceZAR}</span>
            </>
          ) : (
            <span className={styles.price}>
              {priceZAR ? `ZAR ${priceZAR}` : "Free"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
