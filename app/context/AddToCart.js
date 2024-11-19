"use client";
import { createContext, useState } from "react";

export const AddToCart = createContext();

export const AddToCartProvider = ({ children }) => {
   const [cartItems, setCartItems] = useState([]);

   const addToCart = (product) => {
      setCartItems((prevItems) => {
         const isProductInCart = prevItems.find(
            (item) => item.id === product.id
         );

         if (isProductInCart) {
            // If the product is already in the cart, increment quantity
            return prevItems.map((item) =>
               item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
            );
         }

         // Add new product to the cart
         return [...prevItems, { ...product, quantity: 1 }];
      });
   };

   return (
      <AddToCart.Provider value={{ cartItems, addToCart }}>
         {children}
      </AddToCart.Provider>
   );
};
