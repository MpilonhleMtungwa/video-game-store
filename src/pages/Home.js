import React, { useEffect, useState } from "react";
import { fetchGameDetails } from "../services/rawgService";
import { fetchGamePrices } from "../services/cheapSharkService";
import Slideshow from "../components/Slideshow";
import ProductGrid from "../components/ProductGrid";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        // Fetch detailed game data from RAWG
        const fetchGameDetails = async () => {
          const response = await fetch("/api/games");
          const data = await response.json();
          return data;
        };

        // Fetch prices for each game from CheapShark
        const fetchGamePrices = async (title) => {
          const response = await fetch(`/api/prices?title=${title}`);
          const data = await response.json();
          return data;
        };
        setGames(gamesWithPrices);
      } catch (error) {
        console.error("Failed to load games with prices", error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  // Helper function to filter games by category and limit the number of items displayed
  const getCategoryGames = (category, limit) => {
    return games.filter((game) => game.genre === category).slice(0, limit);
  };

  if (loading) return <div>Loading games...</div>;

  return (
    <div className={styles.homepageContainer}>
      <Slideshow games={games} /> {/* Slideshow component */}
      <h2 className={styles.sectionTitle}>New Arrivals</h2>
      <ProductGrid products={getCategoryGames("New", 4)} />
      <h2 className={styles.sectionTitle}>Action</h2>
      <ProductGrid products={getCategoryGames("Action", 4)} />
      <h2 className={styles.sectionTitle}>Horror</h2>
      <ProductGrid products={getCategoryGames("Horror", 4)} />
      <h2 className={styles.sectionTitle}>FPS</h2>
      <ProductGrid products={getCategoryGames("FPS", 4)} />
    </div>
  );
};

export default HomePage;
