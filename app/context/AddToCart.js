"use client";
import { createContext, useState } from "react";

export const AddToCart = createContext();

export default function AddToCartProvider({ children }) {
   const [count, setCount] = useState(0);

   const handleCounter = () => {
      setCount(count + 1);
   };

   return (
      <AddToCart.Provider value={{ setCount, count, handleCounter }}>
         {children}
      </AddToCart.Provider>
   );
}
