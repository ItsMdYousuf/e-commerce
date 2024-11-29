import { useEffect, useState } from "react";
import "./Slider.css"; // Updated CSS

const Slider = ({ images, autoplayInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Autoplay functionality
  useEffect(() => {
    const autoplay = !isHovered
      ? setInterval(goToNext, autoplayInterval)
      : null;

    return () => {
      if (autoplay) clearInterval(autoplay);
    };
  }, [isHovered, autoplayInterval]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1,
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="slider-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="slider-button prev" onClick={goToPrev}>
        ❮
      </button>
      <div
        className="slider-wrapper"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="slider-slide">
            <img
              className="slider-image"
              src={image}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>
      <button className="slider-button next" onClick={goToNext}>
        ❯
      </button>
      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Slider;
