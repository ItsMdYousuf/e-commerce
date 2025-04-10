"use client";
import { createContext, useState, useEffect } from "react";

export const Context = createContext(null);

function GlobalState({ children }) {
  const [addCarts, setAddCarts] = useState([]);

<<<<<<< HEAD
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
=======
  // add to cart product item
  function handleAddToCart(getCurrentItem) {
    let copyProducts = [...addCarts];
    const indexOfCurrentItem = copyProducts.findIndex(
      (productItem) => productItem.id === getCurrentItem.id,
    );

    console.log(indexOfCurrentItem);

    if (indexOfCurrentItem === -1) {
      copyProducts.push(getCurrentItem);
    }

    setAddCarts(copyProducts);
  }

  // remove from cart product item
  function handleRemoveFromCart(getCurrentItem) {
    let copyProducts = [...addCarts];
    copyProducts = copyProducts.filter(
      (productItem) => productItem.id != getCurrentItem,
    );
    setAddCarts(copyProducts);
    localStorage.setItem("addCarts", JSON.stringify(copyProducts));
  }

  useEffect(() => {
    setAddCarts(JSON.parse(localStorage.getItem("addCart")) || []);
  }, []);

  return (
    <Context.Provider
      value={{ addCarts, handleAddToCart, handleRemoveFromCart }}
    >
      {children}
    </Context.Provider>
  );
>>>>>>> 902aa6a0f83f0e061c4d2b1aab764a07358d6e8b
}

export default GlobalState;
