import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchGameDetails } from "../services/rawgService";

import { Link } from "react-router-dom";
import Slideshow from "../components/Slideshow";
import ProductGrid from "../components/ProductGrid";
import Sidebar from "../components/sideBar";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";
import styles from "../styles/Homepage.module.css";

const HomePage = () => {
  const [mostPopularGames, setMostPopularGames] = useState([]);
  const [recentlyUpdatedGames, setRecentlyUpdatedGames] = useState([]);
  const [actionGames, setActionGames] = useState([]);
  const [puzzleGames, setPuzzleGames] = useState([]);
  const [shooterGames, setShooterGames] = useState([]);
  const [racingGames, setRacingGames] = useState([]);
  const [adventureGames, setAdventureGames] = useState([]);
  const [filteredGames, setFilteredGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handlePlatformSelect = async (platform) => {
    const filteredGames = await fetchGameDetails({ platform });
    setFilteredGames(filteredGames);
  };

  const handleGenreSelect = async (genre) => {
    const filteredGames = await fetchGameDetails({ genre });
    setFilteredGames(filteredGames);
  };

  const handleLoadAll = async () => {
    const allGames = await fetchGameDetails();
    setFilteredGames(allGames);
  };

  useEffect(() => {
    const loadGames = async () => {
      try {
        // Fetch most popular games
        const popularGames = await fetchGameDetails("most_popular");

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

        setRecentlyUpdatedGames(updatedGames);
      } catch (error) {
        console.error("Failed to load games", error);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className={styles.pageContainer}>
      {/* Navbar at the top */}
      <NavBar />

      <div className={styles.mainContainer}>
        <Sidebar
          onPlatformSelect={handlePlatformSelect}
          onGenreSelect={handleGenreSelect}
          onLoadAll={handleLoadAll}
        />

        <div className={styles.slideshowcontainer}>
          <Slideshow games={recentlyUpdatedGames} />

          <div className={styles.homepageContainer}>
            <h2 className={styles.sectionHeading}>Popular</h2>
            <ProductGrid games={mostPopularGames} />

            <h2 className={styles.sectionHeading}>Action</h2>
            <ProductGrid games={actionGames} />

            <h2 className={styles.sectionHeading}>Puzzle</h2>
            <ProductGrid games={puzzleGames} />

            <h2 className={styles.sectionHeading}>Shooter</h2>
            <ProductGrid games={shooterGames} />

            <h2 className={styles.sectionHeading}>Racing</h2>
            <ProductGrid games={racingGames} />

            <h2 className={styles.sectionHeading}>Adventure</h2>
            <ProductGrid games={adventureGames} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
