"use client"
import Products from "@/components/Products/Products";
import SwiperSlider from "@/components/Swiper/SwiperSlider";

export default function Home() {
  return (
    <div>
      <SwiperSlider />
      <Products />
    </div>
  );
}
