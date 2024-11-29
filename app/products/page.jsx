"use client";

import Filter from "@/components/Filter";
import Title from "@/components/Title";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const Products = () => {
  const [data, setData] = useState([]); // Ensure it's initialized as an array
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(8); // Initialize with 8 products

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((result) => {
        setData(result.products || []); // Extract the products array
        setLoading(false);
      })
      .catch(() => {
        setData([]); // Fallback to an empty array in case of error
        setLoading(false);
      });
  }, []);

  // Handler to show more products
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // Show 8 more products
  };

  return (
    <div className="container px-10 pb-10">
      <title>E-Commerce</title>
      <Title titleName="Products" />

      <Filter />
      <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading && <h2 className="text-center">Loading...</h2>}
        {!loading && data.length === 0 && (
          <h2 className="text-center">No products available</h2>
        )}
        {!loading &&
          data
            .slice(0, visibleCount)
            .map((item) => <ProductItem key={item.id} singleProduct={item} />)}
      </div>
      {!loading && visibleCount < data.length && (
        <div className="mt-5 text-center">
          <button
            className="rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600"
            onClick={handleShowMore}
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
