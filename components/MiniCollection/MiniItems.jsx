"use client";
import SecondaryButton from "../Buttons/SecondaryButton";

const MiniItems = () => {
  return (
    <div className="flex">
      <div>
        <h2 className="text-2xl">Man</h2>
        <p className="pb-5 pt-3 text-sm">
          Lorem ipsum dolor sit amet, consectetur adipisicing.
        </p>
        <SecondaryButton className="" children="Shop Now" />
      </div>
      <div>
        <img
          className="h-[392px] w-[500px] object-cover object-right"
          src="https://ecomart-typescript.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcategory-banner1.faf5234b.jpg&w=1080&q=75"
        />
      </div>
    </div>
  );
};

export default MiniItems;
