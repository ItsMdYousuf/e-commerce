"use client";
import Title from "../Title";
import MiniItems from "./MiniItems";

const MiniCollection = () => {
  return (
    <div className="mb-20 bg-white">
      <Title titleName="Min Collection" />
      <div className="grid grid-flow-col grid-cols-3 gap-4 px-5">
        <div className="row-span-3 bg-red-50">
          <MiniItems />
        </div>
        <div className="bg-purple-50 py-20">b</div>
        <div className="bg-yellow-50 py-20">c</div>
        <div className="row-span-3 bg-green-50 py-20">d</div>
      </div>
    </div>
  );
};

export default MiniCollection;
