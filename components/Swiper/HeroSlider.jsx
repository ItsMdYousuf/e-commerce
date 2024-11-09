"use client";
import Button from "../Buttons/Button";

const HeroSlider = ({ subTitle, title, productStatus }) => {
  return (
    <div className="slider__height grid w-full grid-cols-3 bg-pink-50 px-10">
      <div className="col-span-2">
        <div className="flex h-[400px] flex-col items-start justify-center">
          <h5 className="text-xs capitalize">{subTitle}</h5>
          <h4>{productStatus}</h4>
          <h1 className="text-4xl capitalize">{title}</h1>
          <Button children="Shop Now" />
        </div>
      </div>
      <div className="col-span-1">img</div>
    </div>
  );
};

export default HeroSlider;
