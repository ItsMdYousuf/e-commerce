"use client";
import React, { createContext, useState, useEffect, useMemo } from "react";

// Create the context
export const Context = createContext(null);

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
   try {
      const savedCart = localStorage.getItem("addCarts"); // Use consistent key "addCarts"
      return savedCart ? JSON.parse(savedCart) : []; // Parse or return empty array
   } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return []; // Return empty array on error
   }
};

// Global state provider component
function GlobalState({ children }) {
   // Initialize state directly from localStorage
   const [addCarts, setAddCarts] = useState(() => loadCartFromLocalStorage());

   // Effect to save cart to localStorage whenever it changes
   useEffect(() => {
      try {
         localStorage.setItem("addCarts", JSON.stringify(addCarts));
      } catch (error) {
         console.error("Failed to save cart to localStorage:", error);
      }
   }, [addCarts]); // Dependency array ensures this runs when addCarts changes

   // Function to add an item to the cart
   function handleAddToCart(getCurrentItem) {
      setAddCarts((prevCarts) => {
         const copyProducts = [...prevCarts];
         const indexOfCurrentItem = copyProducts.findIndex(
            (productItem) => productItem.id === getCurrentItem.id,
         );

         if (indexOfCurrentItem === -1) {
            // If item is not in cart, add it with quantity 1
            copyProducts.push({ ...getCurrentItem, quantity: 1 });
         } else {
            // If item is already in cart, optionally increase quantity (or handle as needed)
            // For now, we just ensure it exists. Quantity update is handled separately.
            // You could increment quantity here if desired:
            // copyProducts[indexOfCurrentItem].quantity += 1;
            console.log("Item already in cart:", getCurrentItem.id);
         }
         return copyProducts; // Return the new state
      });
   }

   // Function to remove an item from the cart by its ID
   function handleRemoveFromCart(itemIdToRemove) {
      setAddCarts((prevCarts) => {
         const updatedCarts = prevCarts.filter(
            (productItem) => productItem.id !== itemIdToRemove,
         );
         return updatedCarts; // Return the new state
      });
   }

   // Function to update the quantity of an item in the cart
   function updateQuantity(itemId, newQuantity) {
      // Ensure quantity is at least 1
      if (newQuantity < 1) {
         handleRemoveFromCart(itemId); // Remove if quantity drops below 1
         return;
      }

      setAddCarts((prevCarts) => {
         const updatedCarts = prevCarts.map((item) =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item,
         );
         return updatedCarts; // Return the new state
      });
   }

   // Calculate the total price of the cart using useMemo for optimization
   const cartTotal = useMemo(() => {
      return addCarts.reduce((total, item) => {
         // Use fallback values (0 for price, 1 for quantity) if properties are missing
         const itemPrice = item.price || 0;
         const itemQuantity = item.quantity || 1;
         return total + itemPrice * itemQuantity;
      }, 0); // Start total at 0
   }, [addCarts]); // Recalculate only when addCarts changes

   // Provide state and functions through the context
   return (
      <Context.Provider
         value={{
            addCarts,
            handleAddToCart,
            handleRemoveFromCart,
            updateQuantity, // Provide the new function
            cartTotal, // Provide the calculated total
         }}
      >
         {children}
      </Context.Provider>
   );
}

export default GlobalState;
