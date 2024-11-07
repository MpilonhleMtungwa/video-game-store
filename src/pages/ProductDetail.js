import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/ProductDetail.module.css";
import NavBar from "../components/NavBar";
import { fetchRawgGameData, fetchSteamPriceData } from "../Api/api";

const ProductDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [priceZAR, setPriceZAR] = useState(null); // ZAR price state
  const [mediaItems, setMediaItems] = useState([]); // Media items state
  const [currentSlide, setCurrentSlide] = useState(0); // Slide index state

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

        // Set media items (trailer + screenshots)
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

        // Fetch price information from Steam API (or substitute your API)
        const priceData = await fetchSteamPriceData(id);
        const priceInZAR = (priceData.price * priceData.exchangeRate).toFixed(
          2
        );
        setPriceZAR(priceInZAR);
      } catch (error) {
        console.error("Error fetching game details or price", error);
      }
    };

    fetchGameDetails();
  }, [id]);

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
            Rating: {game.rating || "N/A"}
          </span>
          {/* Add other tags from RAWG API if available */}
          {game.genres && (
            <span className={styles.genres}>
              Genres: {game.genres.map((genre) => genre.name).join(", ")}
            </span>
          )}
        </div>
      </div>
      <div className={styles.productDetailContainer}>
        <div className={styles.mediaSection}>
          <div className={styles.slideshowContainer}>
            {mediaItems.length > 0 && mediaItems[currentSlide] ? (
              mediaItems[currentSlide].type === "video" ? (
                <video controls className={styles.gameVideo}>
                  <source src={mediaItems[currentSlide].url} type="video/mp4" />
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
          <div className={styles.tabs}>
            <button className={styles.tabButton}>Overview</button>
            <button className={styles.tabButton}>Add-Ons</button>
          </div>
          <div className={styles.tabContent}>
            <p>{game.description}</p>
          </div>
        </div>
        <div className={styles.purchaseSection}>
          <h1 className={styles.gameTitle}>{game.title}</h1>
          <div className={styles.gameHeader}>
            <span className={styles.highlight}>Base Game</span>
            <span className={styles.gamePrice}>ZAR {priceZAR}</span>
          </div>
          <button className={styles.buyButton}>Buy Now</button>
          <button className={styles.addButton}>Add To Cart</button>
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
    </div>
  );
};

export default ProductDetail;
