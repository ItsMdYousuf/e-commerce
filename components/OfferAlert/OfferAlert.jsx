"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

const OfferAlert = () => {
  const [closeAlert, setCloseAlert] = useState(false);

  // timer set 5 sec
  useEffect(() => {
    setTimeout(() => {
      const timer = setCloseAlert(true);
      return () => timer;
    }, 5000);
  }, []);

  // handler for close
  const handleCloseAlert = () => {
    setCloseAlert(false);
    console.log("closed");
  };

  return (
    <div
      className={`${closeAlert ? "flex" : "hidden"} m-2 mx-auto w-3/4 justify-between rounded-lg bg-yellow-300 px-10 py-2`}
    >
      {/* Content */}
      <p className="text-sm text-slate-700">
        <span className="font-semibold text-black">Hot Offer:</span> Buy one get
        one free.
      </p>
      {/* Close Icon */}
      <span className="cursor-pointer">
        <X onClick={handleCloseAlert} className="size-5" />
      </span>
    </div>
  );
};

export default OfferAlert;
