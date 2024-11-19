import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../styles/Slideshow.module.css";
import { useCart } from "../context/CartContext";
import React, { useRef, useState } from "react";

const Slideshow = ({ games = [] }) => {
  const { addToCart, addToWishlist, setCartItems } = useCart();
  const sliderRef = useRef();
  const [activeSlide, setActiveSlide] = useState(0);

  const calculatePrice = (releaseDate) => {
    const releaseYear = new Date(releaseDate).getFullYear();

    if (releaseYear >= 2022) return 899;
    if (releaseYear >= 2018) return 599;
    if (releaseYear >= 2010) return 299;
    if (releaseYear >= 2000) return 149;
    return 100;
  };

  const gamesWithPrices = games.map((game) => ({
    ...game,
    price: calculatePrice(game.released),
  }));

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 4000, // Adjust the timer duration
    beforeChange: (oldIndex, newIndex) => setActiveSlide(newIndex),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const handleAddToCart = (game) => {
    if (addToCart) {
      // Send the game details to the cart
      const cartItem = {
        id: game.id,
        title: game.name,
        price: game.price,
        image: game.background_image,
      };
      addToCart(cartItem);
    }
  };

  const goToSlide = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.slideshow}>
        <Slider {...settings} ref={sliderRef}>
          {gamesWithPrices.map((game) => (
            <div key={game.id} className={styles.slideContainer}>
              <Link to={`/game/${game.id}`} className={styles.slideLink}>
                <div
                  className={styles.slide}
                  style={{ backgroundImage: `url(${game.background_image})` }}
                >
                  <div className={styles.overlay} />
                  <div className={styles.slideContent}>
                    <h2 className={styles.gameTitle}>{game.name}</h2>
                    <p className={styles.gamePrice}>R {game.price}</p>{" "}
                    {/* Display price */}
                    <button
                      className={styles.addToCartButton}
                      onClick={(e) => {
                        e.preventDefault(); // Prevent navigation when clicking the button
                        handleAddToCart(game);
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
        <div className={styles.slideshowDots}>
          {games.map((game, index) => (
            <div
              key={index}
              className={`${styles.dot} ${
                index === sliderRef.current?.innerSlider.state.currentSlide
                  ? styles.activeDot
                  : ""
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Sample custom arrows for next and previous buttons
const SampleNextArrow = ({ onClick }) => {
  return (
    <div className={styles.nextArrow} onClick={onClick}>
      ▶
    </div>
  );
};

const SamplePrevArrow = ({ onClick }) => {
  return (
    <div className={styles.prevArrow} onClick={onClick}>
      ◀
    </div>
  );
};
export default Slideshow;
