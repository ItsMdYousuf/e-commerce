"use client";
import Button from "../Buttons/Button";

const HeroSlider = ({ subTitle, title, productStatus, img }) => {
  return (
    <div className="slider__height grid w-full grid-cols-3 bg-pink-50 px-10 text-slate-800">
      <div className="col-span-2">
        <div className="flex h-[400px] flex-col items-start justify-center">
          <h5 className="text-xs capitalize italic">{subTitle}</h5>
          <h4 className="font-semibold uppercase">{productStatus}</h4>
          <h1 className="py-5 text-4xl font-extrabold capitalize">{title}</h1>
          <Button children="Shop Now" />
        </div>
      </div>
      <div className="col-span-1">
        <img className="rounded-sm" src={img} alt="" />
      </div>
    </div>
  );
};

export default HeroSlider;
