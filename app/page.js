"use client";
import Products from "@/app/products/page";
import SwiperSlider from "@/components/Swiper/SwiperSlider";

export default function Home() {
  return (
    <div>
      <SwiperSlider />
      <Products />
    </div>
  );
}
