"use client";
import Link from "next/link";
import { useContext, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import { GoHeart } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import Button from "../../components/Buttons/Button";
import { Context } from "../context/AddToCart";

const ProductItem = ({ singleProduct }) => {
  const { addToCart } = useContext(Context); // Get addToCart from context
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const {
    thumbnail = "/fallback-image.jpg",
    title = "Unknown Title",
    price = 0,
    rating = 0,
    description = "No description available.",
    reviews = [],
    id,
  } = singleProduct;

  const roundedRating = Math.round(rating);

  return (
    <div className="group overflow-hidden border-2 bg-gray-100">
      <div className="relative flex flex-col items-center justify-center pb-2">
        <img
          src={thumbnail}
          alt={title}
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
        <Link href={`/products/${id}`}>
          <Button
            children="Shop Now"
            className="absolute bottom-2 -z-10 translate-y-8 opacity-0 shadow-none transition-all duration-300 ease-in-out group-hover:z-10 group-hover:translate-y-0 group-hover:opacity-100"
          />
        </Link>
      </div>
      <div className="border-t-2 p-2">
        <h4 className="text-lg font-semibold">
          <Link href={`/products/${id}`} className="hover:underline">
            {title}
          </Link>
        </h4>
        <div className="flex flex-col justify-between">
          <p className="text-lg">${price}</p>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar
                key={i}
                className={`text-${i < roundedRating ? "yellow-500" : "gray-300"}`}
              />
            ))}
            <p className="ml-2 text-sm text-gray-600">
              ({reviews.length} reviews)
            </p>
          </div>
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
            className="relative w-96 rounded-md bg-white p-6 shadow-lg"
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
              src={thumbnail}
              alt={title}
              className="mb-4"
              onError={(e) => (e.target.src = "/fallback-image.jpg")}
            />
            <h3 className="text-2xl font-semibold">{title}</h3>
            <p className="mt-2 text-gray-700">{description}</p>
            <p className="mt-4 text-lg font-bold">${price}</p>
            <Button
              onClick={() => addToCart(singleProduct)}
              children="Add to Cart"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductItem;
