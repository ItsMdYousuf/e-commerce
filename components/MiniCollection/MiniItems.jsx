"use client";

import Link from "next/link";

const MiniItems = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Example of a single item */}
      <div className="relative overflow-hidden">
        <img
          className="h-[392px] w-[500px] object-cover object-right transition-opacity duration-300 hover:opacity-75"
          src="https://ecomart-typescript.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcategory-banner1.faf5234b.jpg&w=1080&q=75"
          alt="Product Image"
        />
        <div className="absolute bottom-4 left-4 text-white">
          <Link href="/product-page-url">
            <h2 className="text-xl font-semibold hover:underline">
              Product Title
            </h2>
          </Link>
        </div>
      </div>

      {/* Add more items here if needed */}
    </div>
  );
};

export default MiniItems;
