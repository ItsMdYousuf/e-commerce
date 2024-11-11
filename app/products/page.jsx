"use client";

import { useEffect, useState } from "react";
import { productsLoad } from "@/app/api/productsData";
import ProductItem from "./ProductItem";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const products = await productsLoad();
      setData(products);
      setLoading(false)
    };

    fetchData();
  }, []);

  // if (loading == true) {
  //   return (
  //     <div className="flex items-center justify-center space-x-2">
  //       <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-600"></div>
  //       <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-600"></div>
  //       <div className="w-4 h-4 rounded-full animate-pulse dark:bg-violet-600"></div>
  //     </div>
  //   )
  // }
  return (
    <div className="container px-10 py-20 ">
      <h2 className="mb-5 text-center text-3xl">Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-center">
        {
          loading == true && <h2 className="text-center"> loading...</h2>
        }
        {data.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
