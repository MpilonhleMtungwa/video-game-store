import React from "react";

const ProductCard = ({ game }) => (
  <div className="product-card">
    <img src={game.imageUrl} alt={game.title} />
    <h3>{game.title}</h3>
    <p>Rating: {game.rating}</p>
    <p>Price: ${game.price}</p>
    <button>Add to Cart</button>
  </div>
);

export default ProductCard;
