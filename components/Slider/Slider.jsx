import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import "./Slider.css";

const Slider = ({ images, autoplayInterval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Autoplay functionality
  useEffect(() => {
    let autoplay;
    if (!isHovered) {
      autoplay = setInterval(goToNext, autoplayInterval);
    }
    return () => {
      if (autoplay) clearInterval(autoplay);
    };
  }, [isHovered, autoplayInterval, currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div
      className="slider-container m-5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="slider-wrapper"
        animate={{ x: `-${currentIndex * 100}%` }}
        transition={{ type: "tween", duration: 0.6, ease: "easeInOut" }}
      >
        {images.map((image, index) => (
          <div key={index} className="slider-slide" style={{ width: "100%" }}>
            <img
              src={`https://ecommerce-backend-sand-eight.vercel.app${image}`}
              alt={`Slide ${index + 1}`}
              className="slider-image"
            />
          </div>
        ))}
      </motion.div>

      <div className="slider-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Slider;
