"use client";
import Image from "next/image";
import { useContext } from "react";
import { Context } from "../context/AddToCart";
import styles from "./Cart.module.css"; // Import the CSS module

const CartItem = () => {
  const { addCarts, handleRemoveFromCart } = useContext(Context);

  return (
    <div className={styles.cartContainer}>
      <h2 className="pb-2 text-xl">Shopping Cart</h2>
      <div className="flex flex-col gap-4">
        {addCarts.map((item) => (
          <div key={item.id} className="flex flex-row gap-5">
            <Image
              src={item.thumbnail}
              width={72}
              height={60}
              className="mr-2 rounded-lg object-cover"
            />
            <div className="flex flex-col">
              <div className="flex w-full flex-col justify-between gap-3">
                <div className="flex flex-row gap-2">
                  <span className="font-semibold">{item.title}</span>
                  <span className="font-medium">${item.price}</span>
                </div>
                <div>
                  <span className="inline-block w-auto rounded-sm bg-green-200 px-2 py-[2px]">
                    Available
                  </span>
                </div>
              </div>
              <div className="my-2 flex flex-row items-center justify-between">
                <span>Qty 1</span>
                <button
                  onClick={() => handleRemoveFromCart(item.id)}
                  className="font-medium text-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <span className="font-semibold">Subtotal</span>
            <span className="font-medium">$ </span>
          </div>
          <p>Lorem ipsum dolor sit amet.</p>
          <div className="flex flex-row justify-between py-2">
            <button className="rounded-md border-[1px] border-gray-300 px-3 py-2">
              View Cart
            </button>
            <button className="rounded-md border-[1px] border-gray-300 bg-black px-3 py-2 text-white">
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
