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
          "http://localhost:5000/sliders"
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
    return (
      <div className="h-[25rem] flex justify-center items-center">
        <div className="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
      </div>
    );
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