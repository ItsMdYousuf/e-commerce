"use client";
import { useEffect, useState } from "react";
import Products from "@/app/products/page";
import Code from "@/components/Code";
import Features from "@/components/Features";
import OfferAds from "@/components/OfferAlert/OfferAds";
import Slider from "@/components/Slider/Slider";

export default function Home() {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const response = await fetch(
          "https://ecommerce-backend-sand-eight.vercel.app/sliders"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sliders");
        }
        const data = await response.json();
        setSliders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSliders();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading slider...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <Slider
        autoplayInterval={5000}
        images={sliders.map((slider) => slider.image)}
      />
      <Products />
      <OfferAds />
      <Features />
    </div>
  );
}