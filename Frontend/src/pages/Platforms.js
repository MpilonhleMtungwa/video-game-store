import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/sideBar";
import NavBar from "../components/NavBar";
import ProductCard from "../components/ProductCard";
import styles from "../styles/Platforms.module.css";

const platformIds = {
  windows: 4,
  xbox: 1,
  playstation: 18,
};

const PlatformGames = () => {
  const { platform } = useParams();
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch games for the selected platform
    const fetchPlatformGames = async () => {
      try {
        const platformId = platformIds[platform]; // Get the platform ID
        if (!platformId) {
          console.error("Invalid platform specified");
          return;
        }

        const response = await fetch(
          `https://api.rawg.io/api/games?platforms=${platformId}&key=${process.env.REACT_APP_RAWG_API_KEY}&page_size=40`
        );
        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchPlatformGames();
  }, [platform]);

  return (
    <div className={styles.pageContainer}>
      
      <NavBar />
      <div className={styles.mainContainer}>
        <Sidebar />
        <div className={styles.productListView}>
          {games.map((game) => (
            <ProductCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatformGames;
