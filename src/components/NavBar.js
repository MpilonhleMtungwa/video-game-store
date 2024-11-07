import React, { useState } from "react";
import styles from "../styles/NavBar.module.css";
import { FaShoppingCart, FaHeart, FaUser, FaSearch } from "react-icons/fa"; // Font Awesome or similar icon library

const NavBar = () => {
  const [wishlistCount, setWishlistCount] = useState(3); // Example count
  const [cartCount, setCartCount] = useState(2);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (query.trim() === "") return;

    try {
      const response = await fetch(
        `https://api.rawg.io/api/games?key=${process.env.REACT_APP_RAWG_API_KEY}&search=${query}`
      );
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logo}>GameShop</div>

      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className={styles.iconGroup}>
        <div className={styles.icon}>
          <FaHeart />
          {wishlistCount > 0 && (
            <span className={styles.wishlistBadge}>{wishlistCount}</span>
          )}
        </div>
        <div className={styles.icon}>
          <FaShoppingCart />
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </div>
      </div>

      <div className={styles.loginRegister}>
        <button onClick={() => console.log("Login clicked")}>Login</button>
        <button onClick={() => console.log("Register clicked")}>
          Register
        </button>
      </div>

      {/* Display search results */}
      {results.length > 0 && (
        <div className={styles.searchResults}>
          <ul>
            {results.map((game) => (
              <li key={game.id}>{game.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavBar;
