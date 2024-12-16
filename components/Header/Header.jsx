"use client";
import CartItem from "@/app/cart/cartItem";
import { Context } from "@/app/context/AddToCart";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { IoCartOutline } from "react-icons/io5";
import { RiCustomerService2Line } from "react-icons/ri";
import OfferAlert from "../OfferAlert/OfferAlert";
import { NavigationMenuDemo } from "../ui/menuDemo";
import Styles from "./Header.module.css";
import MobileMenu from "./MobileMenu";

const Header = () => {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [searchProduct, setSearchProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const { addCarts } = useContext(Context);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const result = await response.json();
        setAllProducts(result.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  const totalProductsLength = addCarts.length;

  const handleSearchProduct = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchProduct(query);
    const results = query
      ? allProducts?.filter((product) =>
          product.title.toLowerCase().includes(query),
        )
      : allProducts;
    setFilteredProducts(results);
  };

  const handleScroll = () => {
    setIsVisible(window.scrollY <= lastScrollY);
    setLastScrollY(window.scrollY);
  };

  const handleDropdownToggle = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsDropdownVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [lastScrollY]);

  return (
    <>
      <OfferAlert />
      <MobileMenu />
      <header
        className={`${
          !isVisible ? "-translate-y-full" : "translate-y-0"
        } fixed z-50 hidden w-full border-b-[1px] border-slate-800 bg-white px-5 py-2 transition-all duration-300 ease-out sm:block`}
      >
        <div className="grid grid-cols-12">
          <div className="col-span-2 flex items-center justify-center">
            <Link href="/" className="text-lg font-semibold">
              E-Commerce
            </Link>
          </div>
          <div className="relative col-span-6 flex items-center justify-end">
            <NavigationMenuDemo />
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

            {searchProduct && filteredProducts.length > 0 && (
              <div className="absolute right-0 top-12 z-10 w-[300px] rounded-lg border border-gray-300 bg-white shadow-md">
                <ul className="max-h-60 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <li
                      key={product.id}
                      className="cursor-pointer p-2 hover:bg-gray-100"
                    >
                      <Link
                        href={`/products/${product.id}`}
                        className="text-sm"
                      >
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
              <div className="flex w-full flex-row-reverse items-center justify-between pl-4">
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
                  <div className="relative" ref={dropdownRef}>
                    <button
                      className="flex items-center justify-center gap-3 text-lg"
                      onClick={handleDropdownToggle}
                    >
                      <IoCartOutline className="text-2xl" />
                      Cart
                      <span className="absolute -top-2 right-8 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                        {totalProductsLength}
                      </span>
                    </button>

                    {isDropdownVisible && (
                      <div className="absolute right-0 top-14 z-10 w-[300px] rounded-lg bg-white shadow-md">
                        <CartItem />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
