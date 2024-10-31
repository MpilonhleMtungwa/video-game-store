import React from "react";
import styles from "./ProductCard.module.css";

const ProductCard = ({ imageUrl, title, price, description, onAddToCart }) => {
  return (
    <div className={styles.productCard}>
      <img src={imageUrl} alt={title} className={styles.productImage} />
      <div className={styles.productInfo}>
        <p className={styles.productDescription}>{description}</p>
        <h3 className={styles.productTitle}>{title}</h3>
        <div className={styles.productFooter}>
          <p className={styles.productPrice}>ZAR {price}</p>
          <button className={styles.addToCartBtn} onClick={onAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
