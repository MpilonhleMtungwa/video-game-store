import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import NavBar from "../components/NavBar";
import Sidebar from "../components/sideBar";
import styles from "../styles/ProductList.module.css";

const ProductListView = () => {
  const { genre } = useParams(); // Get the genre from the URL
  const [games, setGames] = useState([]);

  useEffect(() => {
    // Fetch games based on the genre
    const fetchGamesByGenre = async () => {
      const response = await fetch(
        `https://api.rawg.io/api/games?genres=${genre}&key=${process.env.REACT_APP_RAWG_API_KEY}&page_size=40`
      );
      const data = await response.json();
      setGames(data.results);
    };

    fetchGamesByGenre();
  }, [genre]);

  <p>Loading games...</p>;

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

export default ProductListView;
