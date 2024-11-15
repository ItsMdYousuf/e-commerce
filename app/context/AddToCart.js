"use client";
import { createContext, useState } from "react";

// Create a context
export const AddToCart = createContext();

export default function AddToCartProvider({ children }) {
   // State to manage cart items
   const [cartItems, setCartItems] = useState([]);

   // Function to add an item to the cart
   const addToCart = (item) => {
      setCartItems((prevItems) => {
         // Check if the item is already in the cart
         const existingItem = prevItems.find((i) => i.id === item.id);
         if (existingItem) {
            // Update quantity if item exists
            return prevItems.map((i) =>
               i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
            );
         }
         // Add new item to the cart
         return [...prevItems, { ...item, quantity: 1 }];
      });
   };

   // Function to remove an item from the cart
   const removeFromCart = (itemId) => {
      setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
   };

   return (
      <AddToCart.Provider value={{ cartItems, addToCart, removeFromCart }}>
         {children}
      </AddToCart.Provider>
   );
}
