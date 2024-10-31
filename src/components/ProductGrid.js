import React from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductGrid.module.css";

const ProductGrid = ({ products }) => {
  return (
    <div className={styles.productgrid}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          imageUrl={product.imageUrl}
          title={product.title}
          price={product.price}
          description={product.description}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
