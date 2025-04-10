"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useContext } from "react";
import { MdDeleteOutline } from "react-icons/md";
// Assuming your context file is correctly located
import { Context } from "../context/AddToCart"; // Adjust path if needed

const CartItem = () => {
  // Define the backend URL (ensure this is correct)
  const backendurl = "https://ecommerce-backend-sand-eight.vercel.app";

  // Get cart state and functions from context
  const { addCarts, handleRemoveFromCart, updateQuantity, cartTotal } =
    useContext(Context);

  // Function to handle quantity changes (delegates to context function)
  const handleQuantityChange = (itemId, change) => {
    const item = addCarts.find((i) => i.id === itemId);
    if (!item) return; // Exit if item not found

    const currentQuantity = item.quantity || 1; // Default to 1 if undefined
    const newQuantity = currentQuantity + change;

    updateQuantity(itemId, newQuantity);
  };

  // Define animation variants for the main container
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  // Ensure cartTotal has a default value of 0 if it's undefined
  const safeCartTotal = cartTotal !== undefined ? cartTotal : 0;

  return (
    // AnimatePresence handles exit animations when items are removed
    <AnimatePresence>
      {/* Main container for the cart */}
      <motion.div
        // Removed fixed height, added max-height for scroll control on larger views
        className="mx-auto w-full max-w-3xl overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
        // Set a max height relative to viewport height, adjust 10rem based on surrounding elements (header/footer)
        style={{ maxHeight: "calc(100vh - 10rem)" }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Cart Title */}
        <h2 className="mb-4 border-b border-gray-200 pb-3 text-lg font-semibold text-gray-800 sm:text-xl">
          Shopping Cart ({addCarts.length}) {/* Display number of items */}
        </h2>

        {/* Conditional rendering: Show items or empty cart message */}
        {addCarts.length > 0 ? (
          <>
            {/* Cart Items List */}
            <div className="space-y-4">
              {" "}
              {/* Increased spacing between items */}
              {/* Map through cart items and render each one */}
              {addCarts.map((item) => (
                <motion.div
                  key={item.id} // Unique key for each item
                  // Responsive layout: Column on small screens, Row on medium+ screens
                  className="flex flex-col items-center gap-4 rounded-md border border-gray-100 bg-gray-50 p-3 shadow-sm sm:flex-row sm:items-start sm:justify-between"
                  layout // Animate layout changes smoothly
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Left side: Image and basic details (stacks vertically on small screens) */}
                  <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:items-start">
                    {/* Product Image and Link */}
                    <Link
                      href={`/products/${item.id}`}
                      className="flex-shrink-0"
                    >
                      <img
                        src={backendurl + item.image}
                        alt={item.title || "Product Image"}
                        // Slightly smaller image on small screens
                        className="h-20 w-20 rounded-md object-cover shadow-md sm:h-24 sm:w-24"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/96x96/e2e8f0/94a3b8?text=N/A";
                        }}
                      />
                    </Link>
                    {/* Product Details (Title, Price) */}
                    <div className="flex flex-col text-center sm:text-left">
                      <Link
                        href={`/products/${item.id}`}
                        className="hover:underline"
                      >
                        {/* Slightly larger title */}
                        <h3 className="text-base font-medium text-gray-900">
                          {item.title || "Product Title Missing"}
                        </h3>
                      </Link>
                      {/* Item Total Price */}
                      <p className="mt-1 text-sm font-semibold text-indigo-600">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                        {/* Show unit price if quantity > 1 */}
                        {(item.quantity || 1) > 1 && (
                          <span className="ml-1 text-xs font-normal text-gray-500">
                            (${(item.price || 0).toFixed(2)} each)
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Right side: Quantity Controls and Remove Button */}
                  {/* Aligns controls to the end on larger screens, centers below on small */}
                  <div className="flex w-full flex-row items-center justify-between gap-4 sm:w-auto sm:flex-col sm:items-end sm:justify-start">
                    {/* Quantity Controls */}
                    <div className="flex items-center rounded-md border border-gray-300 bg-white shadow-sm">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-2.5 py-1 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50" // Slightly more padding
                        disabled={(item.quantity || 1) <= 1}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-sm font-medium text-gray-800">
                        {item.quantity || 1}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-2.5 py-1 text-gray-600 transition-colors hover:bg-gray-100" // Slightly more padding
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                    {/* Remove Item Button */}
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="flex items-center text-xs text-red-500 hover:text-red-700 hover:underline sm:mt-1" // Add margin-top on larger screens
                      aria-label={`Remove ${item.title || "item"} from cart`}
                    >
                      <MdDeleteOutline className="mr-1 h-4 w-4" /> Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>{" "}
            {/* End Cart Items List */}
            {/* Cart Summary Section */}
            <motion.div
              className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:mt-8 sm:p-6" // Slightly more margin/padding on larger screens
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between text-base font-medium text-gray-800">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ${safeCartTotal.toFixed(2)}
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                className="mt-4 block w-full rounded-md bg-indigo-600 px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" // Slightly taller button
              >
                Proceed to Checkout
              </Link>
            </motion.div>
          </>
        ) : (
          // Empty Cart State
          <motion.div
            className="py-10 text-center sm:py-16" // More padding on larger screens
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <svg
              className="mx-auto mb-4 h-12 w-12 text-gray-400 sm:h-16 sm:w-16" // Slightly larger icon
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="mb-4 text-base font-medium text-gray-600 sm:text-lg">
              Your cart is currently empty.
            </p>
            <Link
              href="/"
              className="inline-block rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" // Slightly taller button
            >
              Continue Shopping
            </Link>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CartItem;
