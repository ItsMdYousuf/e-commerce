"use client";
import { featuresData } from "@/app/api/featuresData";
import { useEffect, useState } from "react";

const Features = () => {
  const [myData, setMyData] = useState([]);
  // Set data once on component mount
  useEffect(() => {
    setMyData(featuresData);
  }, []);

  return (
    <div className="container mx-auto flex w-auto flex-wrap justify-center gap-5 py-2">
      {myData.map(({ title, desc, icon, id } = item) => (
        <div
          className="group min-w-[200px] select-none rounded-lg bg-slate-200 px-5 py-3 shadow-2xl transition-all duration-150 ease-out hover:shadow-xl"
          key={id}
        >
          {/* icon */}
          <div className="text-4xl">{icon}</div>
          {/* contents */}
          <div className="mt-2">
            <h2 className="font-semibold group-hover:text-slate-700 lg:text-xl">
              {title}
            </h2>
            <p className="group-hover:text-slate-600">{desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
