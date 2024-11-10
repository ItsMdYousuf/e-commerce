import { GoHeart } from "react-icons/go";
import { IoEyeOutline } from "react-icons/io5";
import Button from "../../components/Buttons/Button";
import Link from "next/link";

const ProductItem = ({ item }) => {
  return (
    <div className="group overflow-hidden border-2 bg-gray-100">
      <div className="relative flex flex-col items-center justify-center pb-2">
        <span className="absolute left-0 top-0 bg-green-500 px-2 py-1 text-xs text-white">
          New
        </span>
        <img
          src={item.thumbnail}
          alt="product pic"
          className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />

        {/* Slide-in Icons from Right on Hover */}
        <div className="absolute right-3 top-3 flex translate-x-full transform flex-col items-center space-y-2 opacity-0 transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:opacity-100">
          <Link href={`/products/${item.id}`}>
            <IoEyeOutline className="h-8 w-8 rounded-md bg-white p-1 transition-colors duration-300 ease-in-out hover:bg-black hover:text-white" />
          </Link>
          <GoHeart className="h-8 w-8 rounded-md bg-white p-1 transition-colors duration-300 ease-in-out hover:bg-black hover:text-white" />
        </div>

        <Button
          children="Shop Now"
          className="absolute bottom-2 -z-10 translate-y-8 opacity-0 shadow-none transition-all duration-300 ease-in-out group-hover:z-10 group-hover:translate-y-0 group-hover:opacity-100"
        />
      </div>
      <div className="border-t-2 pt-2">
        <h4 className="text-lg font-semibold">{item.title}</h4>
        <p className="text-md">$800</p>
      </div>
    </div>
  );
};

export default ProductItem;
