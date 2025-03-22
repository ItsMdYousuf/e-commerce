"use client";
import { useEffect, useState } from "react";
import { serverAPI } from "../api/serverAPI";
const Docs = () => {
  const [products, setProducts] = useState([]); // Changed state name to reflect what it holds
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    fetch(`${serverAPI}/products`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data); // Set the products state with the fetched data
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError(error); // Set error state if there's an error
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []); // Added empty dependency array to run only once

  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  return (
    <div className="">
      Docs
      <div>
        {products.map((product) => (
          <div key={product._id}>
            <p>Title: {product.productTitle}</p>
            <p>Amount: {product.productAmount}</p>
            <img src={`http://localhost:5000${product.image}`} alt="img" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Docs;
