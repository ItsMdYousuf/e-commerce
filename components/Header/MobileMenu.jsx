"use client";

import { Divide as Hamburger } from "hamburger-react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
const MobileMenu = () => {
  const [isOpen, setOpen] = useState(false);
  const [dropDown, setDropDown] = useState(true);
  const [SearchBar, setSearchBar] = useState(false);

  // handler dropDown
  const handleDropDown = () => {
    setDropDown((prev) => !prev);
    console.log(dropDown, "clicked");
  };
  // handle search
  const handleSearch = () => {
    setSearchBar((prev) => !prev);
    console.log(SearchBar, "search clicked");
  };
  return (
    <div className="relative z-50 m-2 rounded-lg bg-black to-blue-500 px-2 text-white transition-all duration-200 ease-linear sm:hidden">
      <span
        className={`${SearchBar ? "block" : "hidden"} absolute top-24 mx-auto flex w-full justify-center`}
      >
        <input
          type="text"
          className="border-2 px-4 text-lg text-black outline-none"
          placeholder="Search Product"
        />
      </span>
      <div className="flex items-center justify-between">
        {/* logo */}
        <div>
          <Link href="/" className="text-lg font-semibold">
            E-Commerce
          </Link>
        </div>
        <div className="flex items-center justify-center gap-2">
          {/* search */}
          <button onClick={handleSearch}>
            <Search />
          </button>
          {/* MenuBar */}
          <span onClick={handleDropDown}>
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </span>
        </div>
      </div>
      <div className={`${!dropDown ? "flex" : "hidden"} flex-col pb-5`}>
        <Link
          className="m-1 rounded-md p-2 transition-all duration-100 ease-in-out hover:bg-gray-900"
          href="/"
        >
          Products
        </Link>
        <Link
          className="m-1 rounded-md p-2 transition-all duration-200 ease-in-out hover:bg-gray-900"
          href="/auth/signup"
        >
          SingUp
        </Link>
        <Link
          className="m-1 rounded-md p-2 transition-all duration-200 ease-in-out hover:bg-gray-900"
          href="/"
        >
          About
        </Link>
        <Link
          className="m-1 rounded-md p-2 transition-all duration-200 ease-in-out hover:bg-gray-900"
          href="/"
        >
          Policy
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
