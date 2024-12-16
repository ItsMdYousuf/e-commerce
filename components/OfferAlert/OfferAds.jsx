"use client";

import { useEffect, useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const OfferAds = () => {
  const [popUp, setPopUp] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 1500) {
        setPopUp(true);
        window.removeEventListener("scroll", handleScroll); // Remove listener after showing the popup
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on component unmount
    };
  }, []);

  const handleClosePopUp = () => {
    setPopUp(false);
    console.log(popUp, "clicked");
  };

  return (
    <div
      className={`${
        popUp ? "flex" : "hidden"
      } fixed inset-0 z-50 items-center justify-center bg-black bg-opacity-50`}
    >
      {/* Ad Content */}
      <div className="relative w-full rounded-md shadow-lg lg:w-2/3">
        <img
          className="mx-auto size-2/3 rounded-md"
          src="https://img.freepik.com/free-vector/origami-super-sale-with-abstract-shapes_1361-1012.jpg?t=st=1734328517~exp=1734332117~hmac=f2097025d1461b9f79b1b14f62870a673fb745ec8efd0f2b7d19fb2429b0d330&w=740"
          alt="ads"
        />
        <span
          onClick={handleClosePopUp}
          className="absolute right-10 top-2 cursor-pointer"
        >
          <IoIosCloseCircle className="text-3xl text-red-500" />
        </span>
      </div>
    </div>
  );
};

export default OfferAds;
