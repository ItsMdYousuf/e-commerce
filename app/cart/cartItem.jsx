"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useContext } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Context } from "../context/AddToCart";

const CartItem = () => {
  // Get cart state and functions from context
  const { addCarts, handleRemoveFromCart, updateQuantity, cartTotal } =
    useContext(Context);

  // Function to handle quantity changes
  const handleQuantityChange = (itemId, change) => {
    const item = addCarts.find((i) => i.id === itemId);
    if (!item) return;

    const currentQuantity = item.quantity || 1;
    const newQuantity = currentQuantity + change;

    // Prevent quantity from going below 1
    if (newQuantity < 1) return;

    updateQuantity(itemId, newQuantity);
  };

  // Fixed image URL handling
  const getImageUrl = (imagePath) => {
    // Handle absolute URLs (e.g., from external sources)
    if (imagePath?.startsWith("http")) {
      return imagePath;
    }

    // Handle relative paths
    return imagePath?.startsWith("/") ? imagePath : `/${imagePath}`;
  };

  // Ensure cartTotal has a default value
  const safeCartTotal = cartTotal !== undefined ? cartTotal : 0;

  return (
    <AnimatePresence>
      <motion.div
        className="mx-auto w-full max-w-3xl overflow-y-auto rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6"
        style={{ maxHeight: "calc(100vh - 10rem)" }}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
        }}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="mb-4 border-b border-gray-200 pb-3 text-lg font-semibold text-gray-800 sm:text-xl">
          Shopping Cart ({addCarts.length})
        </h2>

        {addCarts.length > 0 ? (
          <>
            <div className="space-y-4">
              {addCarts.map((item) => {
                // Calculate item total safely
                const price = parseFloat(item.price) || 0;
                const quantity = item.quantity || 1;
                const itemTotal = (price * quantity).toFixed(2);

                return (
                  <motion.div
                    key={item.id}
                    className="flex flex-col items-center gap-4 rounded-md border border-gray-100 bg-gray-50 p-3 shadow-sm sm:flex-row sm:items-start sm:justify-between"
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:items-start">
                      <Link
                        href={`/products/${item.id}`}
                        className="flex-shrink-0"
                      >
                        <img
                          src={`https://ecommerce-backend-sand-eight.vercel.app/products/${item.image}`}
                          alt={item.title || "Product Image"}
                          className="h-20 w-20 rounded-md object-cover shadow-md sm:h-24 sm:w-24"
                        />
                      </Link>
                      <div className="flex flex-col text-center sm:text-left">
                        <Link
                          href={`/products/${item.id}`}
                          className="hover:underline"
                        >
                          <h3 className="text-base font-medium text-gray-900">
                            {item.title || "Product Title Missing"}
                          </h3>
                        </Link>
                        <p className="mt-1 text-sm font-semibold text-indigo-600">
                          ${itemTotal}
                          {quantity > 1 && (
                            <span className="ml-1 text-xs font-normal text-gray-500">
                              (${price.toFixed(2)} each)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex w-full flex-col-reverse items-center justify-between gap-4 sm:w-auto sm:flex-col-reverse sm:items-end sm:justify-start">
                      <div className="flex items-center rounded-md border border-gray-300 bg-white shadow-sm">
                        <button
                          onClick={() => handleQuantityChange(item.id, -1)}
                          className="px-2.5 py-1 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={quantity <= 1}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 text-sm font-medium text-gray-800">
                          {quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, 1)}
                          className="px-2.5 py-1 text-gray-600 transition-colors hover:bg-gray-100"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="flex items-center text-xs text-red-500 hover:text-red-700 hover:underline sm:mt-1"
                        aria-label={`Remove ${item.title || "item"} from cart`}
                      >
                        <MdDeleteOutline className="mr-1 h-4 w-4" /> Remove
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:mt-8 sm:p-6"
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
                className="mt-4 block w-full rounded-md bg-indigo-600 px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Proceed to Checkout
              </Link>
            </motion.div>
          </>
        ) : (
          <p>Cart is empty</p>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CartItem;
