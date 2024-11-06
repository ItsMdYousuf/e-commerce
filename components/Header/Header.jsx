import Link from "next/link";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { RiCustomerService2Line } from "react-icons/ri";
import Styles from "./Header.module.css";
const Header = () => {
  return (
    <div className="bg-gray-300 px-5 py-2">
      <div className="grid grid-cols-12">
        <div className="col-span-2 flex items-center justify-center">
          <Link href="/" className="text-lg font-semibold">
            E-Commerce
          </Link>
        </div>
        <div className="col-span-6 flex items-center justify-center">
          <input
            className="m-1 w-full rounded-lg border-[1.5px] border-purple-400 px-3 py-2 outline-none"
            type="search"
            placeholder="Search product"
          />
        </div>
        <div className="col-span-4">
          <div className="flex justify-between">
            <div className="flex w-full justify-between">
              <div>
                <p className={`${Styles.flex__Center} gap-5 px-5 text-xs`}>
                  <RiCustomerService2Line className="text-4xl" />
                  <div>
                    <p className="text-sm leading-5">555-666-055</p>
                    <p className="text-sm leading-5">24/7 Support Center</p>
                  </div>
                </p>
              </div>
              <div className={`${Styles.flex__Center} px-5`}>
                <ul className={`${Styles.flex__Center} gap-5 text-xl`}>
                  <li className="">
                    <FaFacebookF />
                  </li>
                  <li>
                    <FaXTwitter />
                  </li>
                  <li>
                    <FaInstagram />
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
