"use client";

import Filter from "@/components/Filter";
import Title from "@/components/Title";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const Products = () => {
  const [data, setData] = useState([]); // Ensure it's initialized as an array
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container px-10 pb-10">
      <Title titleName="Products" />
      <Filter />
      <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading && <h2 className="text-center">Loading...</h2>}
        {!loading && data.length === 0 && (
          <h2 className="text-center">Nproducts o available</h2>
        )}
        {data.map((item) => (
          <ProductItem key={item.id} singleProduct={item} />
        ))}
      </div>
    </div>
  );
};

export default Products;
