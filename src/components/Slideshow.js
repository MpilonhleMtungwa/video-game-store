import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./Slideshow.module.css";

const Slideshow = ({ games }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % games.length);
  };

  return (
    <div className={styles.slideshow}>
      {games.map((game, index) => (
        <div
          key={game.id}
          className={`${styles.slide} ${
            index === currentSlide ? styles.active : ""
          }`}
          style={{ backgroundImage: `url(${game.background_image})` }}
        />
      ))}
      <div className={styles.slideshowDots}>
        {games.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${
              index === currentSlide ? styles.dotActive : ""
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
