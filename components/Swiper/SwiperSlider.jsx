"use client";

import "swiper/css"; // Import Swiper core CSS
import { Swiper, SwiperSlide } from "swiper/react";
import MiniCollection from "../MiniCollection/MiniCollection";
import HeroSlider from "./HeroSlider";
import "./swiper.css";
import { sliderData } from "@/app/api/heroSliderData";

const SwiperSlider = () => {
  const data = sliderData;
  // console.log(data);

  return (
    <>
      <Swiper
        className="mySwiper flex"
        spaceBetween={50} // Spacing between slides
        slidesPerView={1} // Number of slides visible at once
        loop={true} // Infinite loop
        pagination={{ clickable: true }} // Enable pagination if needed
        navigation={true} // Enable navigation if needed
      >
        {/* <HeroSlider
            title="Autumn Fashion for Man"
            subTitle="New Product"
            productStatus="On Trending"
            img='https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTB8fGZhc2hpb258ZW58MHx8MHx8fDA%3D'
            /> */}
        {
          sliderData.map((item, index) => (
            <SwiperSlide key={item.id} className="slider__height">
              <HeroSlider

                title={item.title}
                subTitle={item.subTitle}
                productStatus={item.productStatus}

                img={item.image}
              />
            </SwiperSlide>
          ))
        }


        {/* Add more slides as needed */}
      </Swiper>
      <MiniCollection />
    </>
  );
};

export default SwiperSlider;
