import { sliderData } from "@/app/api/heroSliderData";
import "swiper/css"; // Import Swiper core CSS
import { Swiper, SwiperSlide } from "swiper/react";
import MiniCollection from "../MiniCollection/MiniCollection";
import HeroSlider from "./HeroSlider";
import "./swiper.css";

const SwiperSlider = () => {
  const data = sliderData;

  return (
    <div>
      <Swiper
        className="mySwiper flex"
        spaceBetween={50} // Spacing between slides
        slidesPerView={1} // Number of slides visible at once
        loop={true} // Infinite loop
        pagination={{ clickable: true }} // Enable pagination if needed
        navigation={true} // Enable navigation if needed
        autoplay={{
          delay: 1000, // Time between slides in ms
          disableOnInteraction: false, // Keep autoplay running after user interaction
        }}
      >
        {sliderData.map((item) => (
          <SwiperSlide key={item.id} className="slider__height">
            <HeroSlider
              title={item.title}
              subTitle={item.subTitle}
              productStatus={item.productStatus}
              img={item.image}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <MiniCollection />
    </div>
  );
};

export default SwiperSlider;
