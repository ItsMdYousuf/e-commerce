"use client";
import Image from "next/image";
import Link from "next/link";

const CartItem = () => {
  return (
    <div className="absolute -left-20 top-14 max-h-[360px] w-72 overflow-y-scroll rounded-md bg-white p-4">
      <h2 className="pb-2 text-xl">Shopping Cart</h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-5">
          <Image
            src="https://images.pexels.com/photos/755992/pexels-photo-755992.jpeg?auto=compress&cs=tinysrgb&w=600"
            width={72}
            height={60}
            className="mr-2 rounded-lg object-cover"
          />
          <div className="flex flex-col">
            <div className="flex w-full flex-col justify-between gap-3">
              <div className="flex flex-row gap-2">
                <span className="font-semibold">Product Name</span>
                <span className="font-medium">$40.5</span>
              </div>
              <div>
                <span className="inline-block w-auto bg-green-200">
                  Available
                </span>
              </div>
            </div>
            <div className="my-2 flex flex-row items-center justify-between">
              <span>Qty 1</span>
              <Link href="" className="font-medium text-red-600">
                Remove
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <Image
            src="https://images.pexels.com/photos/755992/pexels-photo-755992.jpeg?auto=compress&cs=tinysrgb&w=600"
            width={72}
            height={60}
            className="mr-2 rounded-lg object-cover"
          />
          <div className="flex flex-col">
            <div className="flex w-full flex-col justify-between gap-3">
              <div className="flex flex-row gap-2">
                <span className="font-semibold">Product Name</span>
                <span className="font-medium">$40.5</span>
              </div>
              <div>
                <span className="inline-block w-auto bg-green-200">
                  Available
                </span>
              </div>
            </div>
            <div className="my-2 flex flex-row items-center justify-between">
              <span>Qty 1</span>
              <Link href="" className="font-medium text-red-600">
                Remove
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <span className="font-semibold">Subtotal</span>
            <span className="font-medium">$40.5</span>
          </div>
          <p>Lorem ipsum dolor sit amet.</p>
          {/* <p>Lorem ipsum dolor sit amet.</p> */}
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
