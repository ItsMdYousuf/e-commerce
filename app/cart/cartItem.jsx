"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useContext } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { Context } from "../context/AddToCart";
<<<<<<< HEAD
=======
import styles from "./Cart.module.css"; // Import the CSS module
import Link from "next/link";
>>>>>>> 902aa6a0f83f0e061c4d2b1aab764a07358d6e8b

const CartItem = () => {
  const backendurl = "https://ecommerce-backend-sand-eight.vercel.app";
  const { addCarts, handleRemoveFromCart, updateQuantity, cartTotal } =
    useContext(Context);

  const handleQuantityChange = (itemId, change) => {
    const item = addCarts.find((i) => i.id === itemId);
    if (!item) return;
    const newQuantity = (item.quantity || 1) + change;
    newQuantity < 1
      ? handleRemoveFromCart(itemId)
      : updateQuantity(itemId, newQuantity);
  };

  // Define animation variants for the container
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.3 } },
  };

  return (
    // AnimatePresence is used if you want to animate component exit animations when unmounting
    <AnimatePresence>
      <motion.div
        className="mx-auto h-[17rem] max-w-3xl overflow-auto p-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2 className="mb-5 text-xl font-bold text-gray-900">
          Shopping Cart ({addCarts.length})
        </h2>
        {addCarts.length > 0 ? (
          <>
            {addCarts.map((item) => (
              <motion.div
                key={item.id}
                className="mb-2 flex flex-row items-center justify-between gap-3 rounded bg-gray-100 p-2 shadow"
                // Optionally, add individual item animations
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Link href={`/products/${item.id}`}>
                  <img
                    src={backendurl + item.image}
                    alt={item.productTitle}
                    className="h-24 w-24 rounded object-cover"
                  />
                </Link>
                <div className="flex w-full flex-col">
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.id}`}
                      className="hover:underline"
                    >
                      <h3 className="text-sm font-semibold text-gray-800">
                        {item.productTitle}
                      </h3>
                    </Link>
                    <div className="mb-2 flex justify-between">
                      <p className="mt-1 text-gray-600">
                        ${(item.unitPrice * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => handleRemoveFromCart(item.id)}
                        className="mt-2 flex items-center text-red-600 hover:underline"
                      >
                        <MdDeleteOutline className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="flex items-center rounded border">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="px-3 py-2 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <span className="px-4 py-2">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="px-3 py-2 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.div
              className="mt-10 rounded bg-white p-6 shadow"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between text-lg font-medium text-gray-700">
                <span>Subtotal</span>
                <span className="text-2xl font-bold text-gray-900">
                  ${cartTotal.toFixed(2)}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                className="mt-6 block w-full rounded bg-blue-600 py-3 text-center text-white hover:bg-blue-700"
              >
                Proceed to Checkout
              </Link>
            </motion.div>
          </>
        ) : (
          <div className="py-20 text-center">
            <svg
              className="mx-auto mb-4 h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <p className="mb-4 text-lg text-gray-600">
              Your cart is currently empty.
            </p>
            <Link
              href="/"
              className="inline-block rounded bg-blue-500 px-5 py-3 text-white hover:bg-blue-600"
            >
              Continue Shopping
            </Link>
          </div>
<<<<<<< HEAD
        )}
      </motion.div>
    </AnimatePresence>
=======
          <p>Lorem ipsum dolor sit amet.</p>
          <div className="flex flex-row justify-between py-2">
            <Link href={'/cart'} className="rounded-md border-[1px] border-gray-300 px-3 py-2">
              View Cart
            </Link>
            <button className="rounded-md border-[1px] border-gray-300 bg-black px-3 py-2 text-white">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
>>>>>>> 902aa6a0f83f0e061c4d2b1aab764a07358d6e8b
  );
};

export default CartItem;
