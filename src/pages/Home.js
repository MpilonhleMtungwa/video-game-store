import React, { useEffect, useState } from "react";
import { fetchGameDetails } from "../services/rawgService";
import { fetchGamePrices } from "../services/cheapSharkService";
import Slideshow from "../components/Slideshow";
import ProductGrid from "../components/ProductGrid";
import styles from "../styles/Homepage.module.css";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [mostPopularGames, setMostPopularGames] = useState([]);
  const [recentlyUpdatedGames, setRecentlyUpdatedGames] = useState([]);
  const [actionGames, setActionGames] = useState([]);
  const [puzzleGames, setPuzzleGames] = useState([]);
  const [shooterGames, setShooterGames] = useState([]);
  const [racingGames, setRacingGames] = useState([]);
  const [adventureGames, setAdventureGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        // Fetch most popular games
        const popularGames = await fetchGameDetails("most_popular");
        console.log("Fetched Popular Games:", popularGames);

        // Fetch different categories of games
        const action = await fetchGameDetails("action");
        const puzzle = await fetchGameDetails("puzzle");
        const shooter = await fetchGameDetails("shooter");
        const racing = await fetchGameDetails("racing");
        const adventure = await fetchGameDetails("adventure");

        // Update states with fetched data
        setMostPopularGames(popularGames);
        setActionGames(action);
        setPuzzleGames(puzzle);
        setShooterGames(shooter);
        setRacingGames(racing);
        setAdventureGames(adventure);

        // Fetch recently updated games
        const updatedGames = await fetchGameDetails("recently_updated");
        console.log("Fetched Recently Updated Games:", updatedGames);
        setRecentlyUpdatedGames(updatedGames);
      } catch (error) {
        console.error("Failed to load games", error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  if (loading) return <div>Loading games...</div>;

  return (
    <div className={styles.homepageContainer}>
      <h2>Popular</h2>
      <ProductGrid games={mostPopularGames} />

      <h2>Recent</h2>
      <ProductGrid games={recentlyUpdatedGames} />

      <h2>Action</h2>
      <ProductGrid games={actionGames} />

      <h2>Puzzle</h2>
      <ProductGrid games={puzzleGames} />

      <h2>Shooter</h2>
      <ProductGrid games={shooterGames} />

      <h2>Racing</h2>
      <ProductGrid games={racingGames} />

      <h2>Adventure</h2>
      <ProductGrid games={adventureGames} />
    </div>
  );
};

/*
const HomePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        // Fetch game details from RAWG
        const rawgGames = await fetchGameDetails("popular");

        // Map through games to add prices to each
        const gamesWithPrices = await Promise.all(
          rawgGames.map(async (game) => {
            const prices = await fetchGamePrices(game.name);
            return { ...game, prices }; // Combine game details with prices
          })
        );

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
      <Slideshow games={games} /> 
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
*/
export default HomePage;
