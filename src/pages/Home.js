import React, { useEffect, useState } from "react";
import { fetchGameDetails } from "../services/rawgService";
import { fetchGamePrices } from "../services/cheapSharkService";
import Slideshow from "../components/Slideshow";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadGames = async () => {
      try {
        // Fetch detailed game data from RAWG
        const rawgGames = await fetchGameDetails("popular");
        // Fetch prices for each game from CheapShark
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

  if (loading) return <div>Loading games...</div>;

  return (
    <div className={styles.homepageContainer}>
      <Slideshow games={games} /> {/* Slideshow component */}
      <h2 className={styles.sectionTitle}>Game Categories</h2>
      {loading ? (
        <div>Loading games...</div>
      ) : (
        <div className={styles.gameCardsContainer}>
          {games.map((game) => (
            <div key={game.id} className={styles.gameCard}>
              <img src={game.background_image} alt={game.name} />
              <div className={styles.gameCardContent}>
                <h3 className={styles.gameTitle}>{game.name}</h3>
                <p className={styles.gamePrice}>
                  Price: ${game.price || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
