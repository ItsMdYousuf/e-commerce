"use client";

import ProductItem from "./ProductItem";

const Products = () => {
  return (
    <div className="container px-10 py-20">
      <h2 className="mb-5 text-center text-3xl">Products</h2>
      <div className="grid grid-cols-4 gap-5">
        <ProductItem />
        <ProductItem />
        <ProductItem />
        <ProductItem />
      </div>
    </div>
  );
};

export default Products;
