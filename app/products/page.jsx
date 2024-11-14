"use client";

import { productsLoad } from "@/app/api/productsData";
import Title from "@/components/Title";
import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const products = await productsLoad();
      setData(products);
      setLoading(false);
      console.log(products);
    };

    fetchData();
  }, []);

  return (
    <div className="container px-10 pb-10">
      <Title titleName="Products" />
      <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-2 lg:grid-cols-4">
        {loading == true && <h2 className="text-center"> loading...</h2>}
        {data.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
