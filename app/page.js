"use client";
import Products from "@/app/products/page";
import Code from "@/components/Code";
import Features from "@/components/Features";
import Slider from "@/components/Slider/Slider";

export default function Home() {

  const images = [
    "https://images.pexels.com/photos/29565594/pexels-photo-29565594/free-photo-of-surfers-observing-waves-at-taghazout-beach.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",

    "https://plus.unsplash.com/premium_photo-1673264933048-3bd3f5b86f9d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",

    "https://plus.unsplash.com/premium_photo-1686064771021-fbd6e301a0e4?q=80&w=1793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ]
  return (
    <div>
      <Slider autoplayInterval="2000" images={images} />
      <Products />
      <Features />
    </div>

  );
}
