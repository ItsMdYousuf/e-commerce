"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import { RiCustomerService2Line } from "react-icons/ri";
import Styles from "./Header.module.css";

// Assuming productsApi is an API function to fetch products
import { productsApi } from "@/app/api/productsData";

const Header = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch the products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productsApi(); // Assuming this is a function to fetch data
        setAllProducts(response); // Store fetched data in the state
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // Handle product search
  const handleSearchProduct = (e) => {
    const query = e.target.value.toLowerCase(); // Ensure consistent case for comparison
    setSearchProduct(query);

    // Filter products based on the search query
    const results = query
      ? allProducts.filter((product) =>
          product.title.toLowerCase().includes(query),
        )
      : allProducts; // Display all products if search bar is empty
    setFilteredProducts(results);
  };

  return (
    <div className="border-b-[1px] border-slate-800 bg-white px-5 py-2">
      <div className="grid grid-cols-12">
        <div className="col-span-2 flex items-center justify-center">
          <Link href="/" className="text-lg font-semibold">
            E-Commerce
          </Link>
        </div>
        <div className="relative col-span-6 flex items-center justify-end">
          {/* Search Filter */}
          <input
            className={`${Styles.header__input} ${
              isInputFocused ? "w-[300px]" : "w-[200px]"
            }`}
            type="text"
            placeholder="Search product"
            value={searchProduct}
            onChange={handleSearchProduct}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
          <BsSearch className="text-md absolute right-5 top-4 cursor-pointer" />

          {/* Display search results */}
          {searchProduct && filteredProducts.length > 0 && (
            <div className="absolute right-0 top-12 z-10 w-[300px] rounded-lg border border-gray-300 bg-white shadow-md">
              <ul className="max-h-60 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    className="cursor-pointer p-2 hover:bg-gray-100"
                  >
                    <Link href={`/product/${product.id}`} className="text-sm">
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="col-span-4">
          <div className="flex justify-between">
            <div className="flex w-full items-center justify-between pl-4">
              <div>
                <div className={`${Styles.flex__Center} gap-5 text-xs`}>
                  <RiCustomerService2Line className="text-4xl" />
                  <div>
                    <p className="text-sm leading-5">555-666-055</p>
                    <p className="text-sm leading-5">24/7 Support Center</p>
                  </div>
                </div>
              </div>
              <div className={`${Styles.flex__Center} gap-5`}>
                <Link className="text-lg" href={"/auth/signup"}>
                  Sign Up
                </Link>
                <div className="relative">
                  <Link
                    className="flex items-center justify-center gap-3 text-lg"
                    href="/cart"
                  >
                    <IoCartOutline className="text-2xl" />
                    Cart
                    <span className="absolute -top-2 right-8 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                      10
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
