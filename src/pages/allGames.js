import { useEffect, useState } from "react";
import Sidebar from "../components/sideBar";
import NavBar from "../components/NavBar";
import styles from "../styles/AllGames.module.css";
import ProductCard from "../components/ProductCard";

const AllGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchAllGames = async () => {
      try {
        const response = await fetch(
          `https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_API_KEY}&page_size=40`
        );
        const data = await response.json();
        setGames(data.results);
      } catch (error) {
        console.error("Error fetching all games:", error);
      }
    };

    fetchAllGames();
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Navbar at the top */}
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

export default AllGames;
