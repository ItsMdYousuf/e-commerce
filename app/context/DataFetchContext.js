"use client";
import { createContext, useEffect, useState } from "react";

// Creating the context
export const DataFetchContext = createContext();

// Context provider component
export function DataFetchProvider({ children }) {
  const [products, setProducts] = useState([]); // Lowercase variable naming convention
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Ensure the loading state updates
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products || []); // Update with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // Handle error by resetting data
      } finally {
        setLoading(false); // Ensure loading completes
      }
    };

    fetchProducts();
  }, []); // Dependency only on initial render

  return (
    <DataFetchContext.Provider value={{ products, loading }}>
      {children}
    </DataFetchContext.Provider>
  );
}
