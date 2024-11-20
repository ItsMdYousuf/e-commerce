"use client";
import Link from "next/link";
import { useContext, useEffect, useRef, useState } from "react";
import { GoHeart } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import Button from "../../components/Buttons/Button";
import { AddToCart } from "../context/AddToCart";

const ProductItem = ({ singleProduct }) => {
  const { addToCart } = useContext(AddToCart); // Get addToCart from context
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        closeModal();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      modalRef.current?.focus(); // Focus the modal when opened
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showModal]);

  return (
    <div className="group overflow-hidden border-2 bg-gray-100">
      <div className="relative flex flex-col items-center justify-center pb-2">
        <span className="absolute left-0 top-0 bg-green-500 px-2 py-1 text-xs text-white">
          New
        </span>
        <img
          src={singleProduct.thumbnail}
          alt={singleProduct.title}
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          onError={(e) => (e.target.src = "/fallback-image.jpg")}
        />

        <div className="absolute right-3 top-3 flex translate-x-full transform flex-col items-center space-y-2 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
          <IoEyeOutline
            className="h-8 w-8 cursor-pointer rounded-md bg-white p-1 transition-colors duration-300 ease-in-out hover:bg-black hover:text-white"
            onClick={openModal}
            aria-label="View Details"
          />
          <GoHeart
            className="h-8 w-8 rounded-md bg-white p-1 transition-colors duration-300 ease-in-out hover:bg-black hover:text-white"
            aria-label="Add to Wishlist"
          />
        </div>
        <Button
          children="Shop Now"
          className="absolute bottom-2 -z-10 translate-y-8 opacity-0 shadow-none transition-all duration-300 ease-in-out group-hover:z-10 group-hover:translate-y-0 group-hover:opacity-100"
          aria-hidden={!showModal}
        />
      </div>
      <div className="border-t-2 p-2">
        <h4 className="text-lg font-semibold">
          <Link
            className="hover:underline"
            href={`/products/${singleProduct.id}`}
          >
            {singleProduct.title}
          </Link>
        </h4>
        <div className="flex justify-between">
          <p className="text-lg">${singleProduct.price}</p>
          <p>
            Review: ({singleProduct.reviews.length}) {singleProduct.rating}
          </p>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          aria-modal="true"
          role="dialog"
        >
          <div
            ref={modalRef}
            className="relative w-96 rounded-md bg-white p-6 shadow-lg focus:outline-none"
            tabIndex={-1}
          >
            <button
              className="absolute right-2 top-2 text-xl text-gray-600 hover:text-gray-800"
              onClick={closeModal}
              aria-label="Close"
            >
              ×
            </button>
            <img
              src={singleProduct.thumbnail}
              alt={singleProduct.title}
              className="mb-4"
              onError={(e) => (e.target.src = "/fallback-image.jpg")}
            />
            <div className="mt-4">
              <Link
                className="mb-2 text-2xl font-semibold"
                href={`/products/${singleProduct.id}`}
              >
                {singleProduct.title}
              </Link>
              <p className="text-gray-700">{singleProduct.description}</p>
              <div className="flex w-full items-center justify-center gap-5">
                <p className="mt-4 text-lg font-bold">${singleProduct.price}</p>
                <Button
                  onClick={() => addToCart(singleProduct)} // Pass product details
                  children="Add to Cart"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
