"use client";

import { createContext, useState, useEffect } from "react";

export const MainContext = createContext();

const handleAddedCart = () => {
  alert("Added to cart");
};
export default function ContextProvider({ children }) {
  return (
    <MainContext.Provider value={{ handleAddedCart }}>
      {children}
    </MainContext.Provider>
  );
}
