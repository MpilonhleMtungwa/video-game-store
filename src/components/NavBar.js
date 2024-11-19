import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { fetchGamesBySearch } from "../Api/fetchGameBySearch";
import { FaHeart, FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";
import logo from "../assets/66dd3cbe6cd841588490e048d739941b-free.png";
import styles from "../styles/NavBar.module.css";

const NavBar = () => {
  const { cartItems = [], wishlist = [] } = useCart();
  const cartCount = cartItems.length;
  const wishlistCount = wishlist.length;

  const [searchQuery, setSearchQuery] = useState(""); // The user's input in the search bar
  const [results, setResults] = useState([]); // To store search results
  const [showResults, setShowResults] = useState(false); // For dropdown visibility
  const searchRef = useRef(null); //detecting outside clicks

  // Fetch games for autocomplete
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResults([]);
      return;
    }

    const fetchAutocompleteResults = async () => {
      try {
        const games = await fetchGamesBySearch(searchQuery);
        setResults(games);
        setShowResults(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    // reduce api calls
    const debounceTimeout = setTimeout(fetchAutocompleteResults, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent the default form submission
    if (searchQuery.trim() === "") return; // Ensure input is not empty

    try {
      const games = await fetchGamesBySearch(searchQuery); // Use the API function
      setResults(games); // Update the results with the fetched games
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className={styles.navbarContainer}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={logo} alt="GameShop Logo" className={styles.logoImage} />
        </Link>
      </div>

      {/* Search Bar */}
      <div ref={searchRef} className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
          onFocus={() => setShowResults(true)} // Open results on focus
        />

        {/* Autocomplete Dropdown */}
        {showResults && results.length > 0 && (
          <div className={styles.searchResults}>
            <ul>
              {results.map((game) => (
                <li key={game.id}>
                  <Link
                    to={`/game/${game.id}`}
                    className={styles.searchResultLink}
                    onClick={() => setShowResults(false)} // Close dropdown on selection
                  >
                    <img
                      src={game.background_image}
                      alt={game.name}
                      className={styles.resultImage}
                    />
                    <span>{game.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {/* Icons for wishlist and cart */}
      <div className={styles.iconGroup}>
        <div className={styles.icon}>
          <Link to="/wishlist">
            <FaHeart />
            {wishlistCount > 0 && (
              <span className={styles.wishlistBadge}>{wishlistCount}</span>
            )}
          </Link>
        </div>
        <div className={styles.icon}>
          <Link to="/cart">
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className={styles.cartBadge}>{cartCount}</span>
            )}
          </Link>
        </div>
      </div>

      {/* Login/Register */}
      <div className={styles.loginRegister}>
        <Link to="/login">
          <FaUser />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
