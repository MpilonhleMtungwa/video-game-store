import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ProductCard.module.css";

const ProductCard = ({ game = {} }) => {
  // Destructure properties from the game object
  const {
    id,
    name,
    background_image,
    price,
    category, // E.g., "Base Game" or "Edition"
    discount, // Discount percentage, if available
    priceBeforeDiscount, // Original price, if discounted
  } = game;

  return (
    <Link to={`/game/${id}`} className={styles.cardLink}>
      {" "}
      {/* Add Link here */}
      <div className={styles.cardContainer}>
        {/* Game Image */}
        <div className={styles.imageContainer}>
          <img src={background_image} alt={name} className={styles.gameImage} />
        </div>

        {/* Category (e.g., Base Game, Edition) */}
        <div className={styles.category}>{category}</div>

        {/* Game Title */}
        <h3 className={styles.title}>{name}</h3>

        {/* Price Section */}
        <div className={styles.priceSection}>
          {discount && priceBeforeDiscount ? (
            <>
              <span className={styles.discount}>{discount}%</span>
              <span className={styles.priceBeforeDiscount}>
                ZAR {priceBeforeDiscount}
              </span>
              <span className={styles.price}>Free</span>
            </>
          ) : (
            <span className={styles.price}>
              {price ? `ZAR ${price}` : "Free"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
