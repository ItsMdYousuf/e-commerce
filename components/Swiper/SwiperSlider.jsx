"use client";

import "swiper/css"; // Import Swiper core CSS
import { Swiper, SwiperSlide } from "swiper/react";
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
        <div className="grid grid-cols-3">
          <div className="col-span-2 w-full bg-gray-400">
            <h4>On Trending</h4>
            <h1 className="capitalize">Autumn Fashion for Man</h1>
          </div>
          <div className="col-span-1 bg-gray-200">img</div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="slider__height">Slide 2</SwiperSlide>
      <SwiperSlide className="slider__height">Slide 3</SwiperSlide>
      <SwiperSlide className="slider__height">Slide 4</SwiperSlide>
      {/* Add more slides as needed */}
    </Swiper>
  );
};

export default SwiperSlider;
