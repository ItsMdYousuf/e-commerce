"use client";

import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const MainContext = createContext();

const handleAddedCart = () => {
  toast.success("This is a success message!");
};
export default function ContextProvider({ children }) {
  return (
    <MainContext.Provider value={{ handleAddedCart }}>
      {children}
    </MainContext.Provider>
  );
}
