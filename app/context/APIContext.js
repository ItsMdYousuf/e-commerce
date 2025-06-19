import { createContext, useContext } from "react";

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
   const baseUrl = "https://ecommerce-backend-sand-eight.vercel.app/"

   const get = async (endpoint) => {
      const res = await fetch(`${baseUrl}${endpoint}`);
      if (!res.ok) throw new Error("API GET request failed");
      return res.json();
   };

   const post = async (endpoint, data) => {
      const res = await fetch(`${baseUrl}${endpoint}`, {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("API POST request failed");
      return res.json();
   };

   const api = { get, post, baseUrl };

   return <ApiContext.Provider value={api}>
      {children}
   </ApiContext.Provider>;
};

export const useApi = () => useContext(ApiContext);