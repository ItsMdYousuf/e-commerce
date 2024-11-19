"use client";
import { useContext } from "react";
import { AddToCart } from "../context/AddToCart";

const CartItem = () => {
  const { cartItems } = useContext(AddToCart);

  return (
    <div className="absolute -left-20 top-14 max-h-[360px] w-72 overflow-y-scroll rounded-md bg-white p-4">
      <h2 className="pb-2 text-xl">Shopping Cart</h2>
      <div className="flex flex-col gap-4">
        {cartItems.map((product) => (
          <div key={product.id} className="flex flex-row gap-5">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="mr-2 rounded-lg object-cover"
              style={{ width: 72, height: 60 }}
            />
            <div className="flex flex-col">
              <div className="flex w-full flex-col justify-between gap-3">
                <div className="flex flex-row gap-2">
                  <span className="font-semibold">{product.title}</span>
                  <span className="font-medium">${product.price}</span>
                </div>
                <div>
                  <span className="inline-block w-auto bg-green-200">
                    Qty: {product.quantity}
                  </span>
                </div>
              </div>
              <div className="my-2 flex flex-row items-center justify-between">
                <span>Qty: {product.quantity}</span>
                <button className="font-medium text-red-600">Remove</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartItem;
