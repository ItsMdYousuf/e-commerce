"use client";
import { useEffect, useState } from "react";

const ViewCart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Fetch products from API
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch(
          "https://ecommerce-backend-sand-eight.vercel.app/products",
        );
        const data = await response.json();
        const items = data.map((product) => ({
          ...product,
          quantity: 1,
          productAmount: parseFloat(product.productAmount),
        }));
        setCartItems(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item._id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((items) => items.filter((item) => item._id !== productId));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.productAmount * item.quantity,
    0,
  );
  const shipping = 0;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8 md:flex-row">
        {/* Cart Items Section */}
        <div className="md:w-2/3">
          <h1 className="mb-6 text-3xl font-bold">
            Your Cart ({cartItems.length})
          </h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center border-b pb-6">
                  {/* Product Image */}
                  <div className="mr-4 h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={`https://ecommerce-backend-sand-eight.vercel.app/${item.image}`}
                      alt={item.productTitle}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {item.productTitle}
                    </h3>
                    <p className="text-gray-600">
                      ${item.productAmount.toFixed(2)}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      <p
                        className="mt-1 text-sm text-gray-500"
                        dangerouslySetInnerHTML={{
                          __html: item.productDescription.slice(0, 50),
                        }}
                      ></p>
                    </p>

                    {/* Quantity Controls */}
                    <div className="mt-2 flex items-center">
                      <button
                        className="rounded-l border px-3 py-1 hover:bg-gray-50"
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span className="border-b border-t px-4 py-1">
                        {item.quantity}
                      </span>
                      <button
                        className="rounded-r border px-3 py-1 hover:bg-gray-50"
                        onClick={() =>
                          handleQuantityChange(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove and Price */}
                  <div className="ml-4 text-right">
                    <button
                      className="mb-2 text-sm text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </button>
                    <p className="font-semibold">
                      ${(item.productAmount * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        {cartItems.length > 0 && (
          <div className="md:w-1/3">
            <div className="rounded-lg bg-gray-50 p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Order Summary</h2>

              <div className="mb-6 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (7%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="mt-3 border-t pt-3">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full rounded-lg bg-black py-3 text-white transition-colors hover:bg-gray-800">
                Proceed to Checkout
              </button>

              <p className="mt-4 text-center text-sm text-gray-500">
                Free returns and 1-year warranty included
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewCart;
