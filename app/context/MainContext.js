"use client";

import { createContext } from "react";
import toast from "react-hot-toast";

export const MainContext = createContext();

const handleAddedCart = (product) => {
  // Check if product title or ID exists to confirm it's valid
  if (product?.title) {
    toast.success(`${product.title} added to the cart successfully!`);
  } else {
    toast.error("Product information is missing.");
  }
};

export default function ContextProvider({ children }) {
  return (
    <MainContext.Provider value={{ handleAddedCart }}>
      {children}
    </MainContext.Provider>
  );
}
