"use client";

const { createContext, useState, useEffect } = require("react");

export const Context = createContext(null);


function GlobalState({ children }) {
   const [addCarts, setAddCarts] = useState([]);

   // add to cart product item
   function handleAddToCart(getCurrentItem) {
      let copyProducts = [...addCarts];
      const indexOfCurrentItem = copyProducts.findIndex(productItem => productItem.id === getCurrentItem.id);

      console.log(indexOfCurrentItem);

      if (indexOfCurrentItem === -1) {
         copyProducts.push(getCurrentItem);
      }

      setAddCarts(copyProducts);
   }

   // remove from cart product item
   function handleRemoveFromCart(getCurrentItem) {
      console.log(copyProducts);
      let copyProducts = [...addCarts]
      copyProducts = copyProducts.filter(productItem => productItem.id != getCurrentItem)
      setAddCarts(copyProducts);
      localStorage.setItem("addCarts", JSON.stringify(copyProducts));
   }

   useEffect(() => {
      setAddCarts(JSON.parse(localStorage.getItem("addCart")) || [])
   }, []);

   return (
      <Context.Provider value={{ addCarts, handleAddToCart, handleRemoveFromCart }}>
         {children}
      </Context.Provider>
   )
}

export default GlobalState;
