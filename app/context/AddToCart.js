"use client";
import { createContext, useState, useEffect } from "react";

export const Context = createContext(null);

function GlobalState({ children }) {
   const [addCarts, setAddCarts] = useState([]);

   // Load cart from localStorage on mount
   useEffect(() => {
      const savedCart = localStorage.getItem("addCarts");
      if (savedCart) setAddCarts(JSON.parse(savedCart));
   }, []);

   const persistCart = (newCart) => {
      setAddCarts(newCart);
      localStorage.setItem("addCarts", JSON.stringify(newCart));
   };

   const handleAddToCart = (item) => {
      // Determine the product ID (either _id or id)
      const productId = item._id || item.id;

      // Check if the product has the required fields; if not, create them
      const productTitle = item.productTitle || item.title;
      const productAmount = item.productAmount || item.price;

      const existingItem = addCarts.find((i) => i.id === productId);

      if (existingItem) {
         const updatedCart = addCarts.map((i) =>
            i.id === productId ? { ...i, quantity: i.quantity + 1 } : i
         );
         persistCart(updatedCart);
      } else {
         persistCart([
            ...addCarts,
            {
               ...item,
               id: productId,
               productTitle,
               unitPrice: parseFloat(productAmount),
               quantity: 1,
            },
         ]);
      }
   };


   const handleRemoveFromCart = (itemId) => {
      const updatedCart = addCarts.filter((item) => item.id !== itemId);
      persistCart(updatedCart);
   };

   // Update the quantity for a specific item.
   const updateQuantity = (itemId, newQuantity) => {
      const updatedCart = addCarts.map((item) =>
         item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      persistCart(updatedCart);
   };

   // Calculate the overall cart total.
   const cartTotal = addCarts.reduce(
      (sum, item) => sum + item.unitPrice * item.quantity,
      0
   );


   const clearCart = () => {
      setAddCarts([]);
      persistCart([]); // Set cart to empty array
      localStorage.removeItem("addCarts");
   };
   return (
      <Context.Provider
         value={{
            addCarts,
            handleAddToCart,
            handleRemoveFromCart,
            updateQuantity,
            cartTotal,
            clearCart
         }}
      >
         {children}
      </Context.Provider>
   );
}

export default GlobalState;
