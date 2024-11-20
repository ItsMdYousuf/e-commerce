"use client";

import Filter from "@/components/Filter";
import Title from "@/components/Title";
import { useEffect, useState } from "react";
import { productsLoad } from "../api/productsData";
import ProductItem from "./ProductItem";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from `productsLoad`
        const products = await productsLoad();
        setData(products);

        // Fetch data from external API
        const response = await fetch(
          "https://dummyjson.com/products/category/mobile-accessories",
        );
        const result = await response.json();

        // Combine or choose which data to use (if needed)
        setData((prevData) => [...prevData, ...result.products]);
      } catch (error) {
        console.error("Failed to load products:", error);
      } finally {
        setLoading(false); // Ensure this runs after all fetches
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container px-10 pb-10">
      <Title titleName="Products" />

      <Filter />
      <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading && <h2 className="text-center">Loading...</h2>}
        {data.map((item) => (
          <ProductItem singleProduct={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
