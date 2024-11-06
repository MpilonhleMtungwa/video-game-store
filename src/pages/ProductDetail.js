import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [price, setPrice] = useState(null);
  const [priceZAR, setPriceZAR] = useState(null); // State to store ZAR price
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mediaItems, setMediaItems] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(1);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        // Fetch game details from RAWG API
        const rawgResponse = await fetch(
          `https://api.rawg.io/api/games/${id}?key=${process.env.REACT_APP_RAWG_API_KEY}`
        );
        const rawgData = await rawgResponse.json();
        console.log("RAWG Data:", rawgData); // Inspect the structure of the response

        // Set game details with fallbacks
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

        //screenshots
        const screenshotsResponse = await fetch(
          `https://api.rawg.io/api/games/${id}/screenshots?key=${process.env.REACT_APP_RAWG_API_KEY}`
        );
        const screenshotsData = await screenshotsResponse.json();
        const screenshots = screenshotsData.results.map((screenshot) => ({
          type: "image",
          url: screenshot.image,
        }));
        setMediaItems(trailer ? [trailer, ...screenshots] : screenshots);

        // Fetch price information from CheapShark API
        const cheapSharkResponse = await fetch(
          `https://www.cheapshark.com/api/1.0/deals?title=${rawgData.name}`
        );
        const cheapSharkData = await cheapSharkResponse.json();
        const lowestPriceDeal = cheapSharkData[0]?.salePrice || "N/A";
        setPrice(lowestPriceDeal);

        const exchangeRateResponse = await fetch(
          `https://api.exchangerate-api.com/v4/latest/USD`
        );
        const exchangeRateData = await exchangeRateResponse.json();
        const usdToZarRate = exchangeRateData.rates.ZAR;
        setExchangeRate(usdToZarRate);

        // Convert price to ZAR
        const priceInZAR = lowestPriceDeal * usdToZarRate;
        setPriceZAR(priceInZAR.toFixed(2)); // Round to 2 decimal places
      } catch (error) {
        console.error("Failed to fetch game details or exchange rate", error);
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
  );
};

export default ProductDetail;
