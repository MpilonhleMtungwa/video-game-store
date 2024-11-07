import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard"; // Assuming you already have a ProductCard component
import styles from "./ProductListView.module.css";

const ProductListView = ({ genre }) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGamesByGenre = async () => {
      setLoading(true);
      try {
        // Fetch games from RAWG API based on the genre
        const response = await fetch(
          `https://api.rawg.io/api/games?genres=${genre}&key=${process.env.REACT_APP_RAWG_API_KEY}`
        );
        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        console.error("Error fetching games:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGamesByGenre();
  }, [genre]);

  if (loading) return <p>Loading games...</p>;

  return (
    <div className={styles.productListViewContainer}>
      {games.map((game) => (
        <ProductCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default ProductListView;
