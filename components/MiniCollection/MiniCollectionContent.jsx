"use client";
import Link from "next/link";

const MiniCollectionContent = ({ CollectionName, href }) => {
  return (
    <>
      <div className="absolute bottom-10 z-10 flex w-full translate-y-28 px-10 duration-200 group-hover:translate-y-0">
        <Link href={href} className="text-xl font-semibold text-white">
          {CollectionName}
        </Link>
      </div>
    </>
  );
};

export default MiniCollectionContent;
