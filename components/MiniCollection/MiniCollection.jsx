"use client";
import Image from "next/image";
import Title from "../Title";
import makeup from "../img/makeup.jpg";
import man from "../img/man.jpeg";
import pc from "../img/pc.jpg";
import woman from "../img/woman.webp";
import Styles from "./MinCollection.module.css";
import MiniCollectionContent from "./MiniCollectionContent";
const MiniCollection = () => {
  return (
    <div className="mb-20 bg-white">
      <Title titleName="Min Collection" />
      <div className="grid grid-flow-col grid-cols-3 gap-4 px-5">
        <div
          className={`${Styles.product_content} group row-span-3 min-h-[395px] min-w-[395px] overflow-hidden bg-red-50`}
        >
          <MiniCollectionContent href="/" CollectionName="Man Collection" />
          <Image
            src={man}
            width={1000}
            className={`${Styles.img__fill} object-cover`}
            height={1000}
            alt=""
          />
        </div>
        <div
          className={`min-h-[280px] ${Styles.product_content} group min-w-[400px] overflow-hidden bg-purple-50`}
        >
          <MiniCollectionContent href="/" CollectionName="PC Collection" />

          <Image
            src={pc}
            width={300}
            className={`${Styles.img__fill}`}
            height={200}
            alt=""

          />
        </div>
        <div
          className={`${Styles.product_content} group min-h-[280px] min-w-[400px] overflow-hidden bg-yellow-50`}
        >
          <MiniCollectionContent
            href="/"
            CollectionName="Cosmetics Collection"
          />

          <Image
            src={makeup}
            width={300}
            className={`${Styles.img__fill}`}
            height={300}
            alt=""

          />
        </div>
        <div
          className={`row-span-3 ${Styles.product_content} group min-h-[395px] min-w-[395px] overflow-hidden bg-green-50`}
        >
          <MiniCollectionContent href="/" CollectionName="Woman Collection" />

          <Image
            src={woman}
            width={500}
            className={`${Styles.img__fill} object-cover`}
            height={1500}
            alt=""

          />
        </div>
      </div>
    </div>
  );
};

export default MiniCollection;
