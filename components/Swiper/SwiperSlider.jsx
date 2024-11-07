"use client";

import "swiper/css"; // Import Swiper core CSS
import { Swiper, SwiperSlide } from "swiper/react";
import HeroSlider from "./HeroSlider";
import "./swiper.css";

const SwiperSlider = () => {
  return (
    <Swiper
      className="mySwiper flex"
      spaceBetween={50} // Spacing between slides
      slidesPerView={1} // Number of slides visible at once
      loop={true} // Infinite loop
      pagination={{ clickable: true }} // Enable pagination if needed
      navigation={true} // Enable navigation if needed
    >
      <SwiperSlide className="slider__height">
        <HeroSlider
          title="Autumn Fashion for Man"
          subTitle="New Product"
          productStatus="On Trending"
        />
      </SwiperSlide>
      <SwiperSlide className="slider__height">
        <HeroSlider />
      </SwiperSlide>
      <SwiperSlide className="slider__height">
        <HeroSlider />
      </SwiperSlide>
      <SwiperSlide className="slider__height">
        <HeroSlider />
      </SwiperSlide>
      {/* Add more slides as needed */}
    </Swiper>
  );
};

export default SwiperSlider;
