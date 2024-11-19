"use client";
import { createContext, useEffect, useState } from "react";

// Creating the context
export const DataFetchContext = createContext();

// Context provider component
export function DataFetchProvider({ children }) {
   const [Products, setProducts] = useState([]);
   const [Loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchProducts = async () => {
         setLoading(true); // Set loading to true before fetching
         try {
            const response = await fetch("https://dummyjson.com/products");
            const data = await response.json();
            setProducts(data.products || []);
         } catch (error) {
            console.error("Error fetching products:", error);
         } finally {
            setLoading(false); // Set loading to false after fetching
         }
      };

      fetchProducts();
   }, []);

   return (
      <DataFetchContext.Provider value={{ Products, Loading }}>
         {children}
      </DataFetchContext.Provider>
   );
}