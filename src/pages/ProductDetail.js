import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "../styles/ProductDetail.module.css";
import NavBar from "../components/NavBar";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate, useLocation } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { fetchRawgGameData, fetchSteamPriceData } from "../Api/api";

const calculatePrice = (releaseYear) => {
  if (releaseYear >= 2022) return 899;
  if (releaseYear >= 2018) return 599;
  if (releaseYear >= 2010) return 299;
  if (releaseYear >= 2000) return 149;
  return 100;
};

const ProductDetail = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, setCartItems } = useCart();
  const { addToWishlist } = useWishlist();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { id } = useParams();
  const [game, setGame] = useState({});

  const [mediaItems, setMediaItems] = useState([]); // Media items state
  const [currentSlide, setCurrentSlide] = useState(0); // Slide index state

  const releaseYear = new Date(game.releaseDate).getFullYear();
  const priceZAR = calculatePrice(releaseYear);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        // Fetch game details from RAWG
        const rawgResponse = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${process.env.REACT_APP_RAWG_API_KEY}`
        );
        const rawgData = await rawgResponse.json();

        // Set game details
        setGame({
          title: rawgData.name || "Title not available",
          background_image: rawgData.background_image || "Image not available",
          id: rawgData.id || "ID not available",
          description:
            rawgData.description_raw ||
            rawgData.description ||
            "Description not available",
          rating: rawgData.rating || "Rating not available",
          developer:
            rawgData.developers?.[0]?.name || "Developer not available",
          publisher:
            rawgData.publishers?.[0]?.name || "Publisher not available",
          releaseDate: rawgData.released || "Release date not available",
          platform:
            rawgData.platforms?.map((p) => p.platform.name).join(", ") ||
            "Platform not available",
        });

        // Set media items screenshots and trailer
        const trailer = rawgData.clip?.clip
          ? { type: "video", url: rawgData.clip.clip }
          : null;

        // Fetch screenshots
        const screenshotsResponse = await fetch(
          `https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.REACT_APP_RAWG_API_KEY}`
        );
        const screenshotsData = await screenshotsResponse.json();
        const screenshots = screenshotsData.results.map((screenshot) => ({
          type: "image",
          url: screenshot.image,
        }));
        setMediaItems(trailer ? [trailer, ...screenshots] : screenshots);
      } catch (error) {
        console.error("Error fetching game details or price", error);
      }
    };

    fetchGameDetails();
  }, [id]);

  //Add to cart Items properties
  const handleAddToCart = () => {
    const cartItem = {
      id: game.id,
      title: game.title,
      image: game.background_image,
      price: priceZAR,
    };

    // Add to cart and save to local storage
    addToCart(cartItem);
    console.log(cartItem);
  };

  const handleAddToWishlist = async () => {
    // Check if the user is logged in
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      alert("You need to log in to add items to your wishlist.");
      navigate("/login"); // Redirect to the login page
      return; // Exit the function early
    }

    const wishlistItem = {
      id: game.id,
      title: game.title,
      image: game.background_image,
      price: priceZAR,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/wishlist",
        { game: wishlistItem },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Add the auth token
          },
        }
      );

      if (response.status === 200) {
        console.log("Game added to wishlist");
        alert("Game added to wishlist");
        setShowConfirmation(true); // Optionally, show a confirmation message
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error.message);
      alert("Failed to add to wishlist");
    }
  };

  console.log("Game data:", game);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mediaItems.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length
    );
  };

  if (!game.title) return <div>Loading...</div>;

  return (
    <div className={styles.pageContainer}>
      {/* Navbar at the top */}
      <NavBar />
      <div className={styles.gameInfoSection}>
        <h1 className={styles.gameTitle}>{game.title}</h1>
        <div className={styles.gameTags}>
          {/* Display review score and any other tags here */}
          <span className={styles.reviewScore}>
            Rating: {game.rating || "N/A"}/5
          </span>
          {game.genres && (
            <span className={styles.genres}>
              Genres: {game.genres.map((genre) => genre.name).join(", ")}
            </span>
          )}
        </div>
      </div>

      <div className={styles.productDetailContainer}>
        <div className={styles.mediaAndPurchase}>
          {/* Media Section */}
          <div className={styles.mediaSection}>
            <div className={styles.slideshowContainer}>
              {mediaItems.length > 0 && mediaItems[currentSlide] ? (
                mediaItems[currentSlide].type === "video" ? (
                  <video controls className={styles.gameVideo}>
                    <source
                      src={mediaItems[currentSlide].url}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img
                    src={mediaItems[currentSlide].url}
                    alt="Screenshot"
                    className={styles.gameImage}
                  />
                )
              ) : (
                <p>Loading media...</p>
              )}
              <button onClick={handlePrevSlide} className={styles.prevButton}>
                ❮
              </button>
              <button onClick={handleNextSlide} className={styles.nextButton}>
                ❯
              </button>
            </div>
          </div>

          {/* Purchase Section */}
          <div className={styles.purchaseSection}>
            <h1 className={styles.gameTitle}>{game.title}</h1>
            <div className={styles.gameHeader}>
              <span className={styles.highlight}>Base Game</span>
              <span className={styles.gamePrice}>R {priceZAR}</span>
            </div>
            <button onClick={handleAddToWishlist} className={styles.buyButton}>
              Add to Wishlist
            </button>
            {showConfirmation && (
              <div className={styles.confirmation}>
                Added to wishlist!{" "}
                <button onClick={() => navigate("/wishlist")}>
                  Go to Wishlist
                </button>
              </div>
            )}
            <button onClick={handleAddToCart} className={styles.addButton}>
              Add To Cart
            </button>
            <div className={styles.gameDetails}>
              <p>
                <strong>Developer:</strong> {game.developer}
              </p>
              <p>
                <strong>Publisher:</strong> {game.publisher}
              </p>
              <p>
                <strong>Release Date:</strong> {game.releaseDate}
              </p>
              <p>
                <strong>Platform:</strong> {game.platform}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className={styles.tabs}>
          <button className={styles.tabButton}>Overview</button>
          <button className={styles.tabButton}>Add-Ons</button>
        </div>
        <div className={styles.tabContent}>
          <p>{game.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
