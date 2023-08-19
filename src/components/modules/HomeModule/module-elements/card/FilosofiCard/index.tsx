import React from "react";
import Image from "next/image";
import { FilosofiCardProps } from "./interface";

export const FilosofiCard: React.FC<FilosofiCardProps> = (
  props: FilosofiCardProps
) => {
  return (
    <div className="relative col-span-4 h-48 overflow-hidden rounded-2xl md:col-span-2 md:h-72 lg:h-96">
      <Image
        fill
        src={props.imgSrc}
        alt={props.imgAlt}
        className="object-cover"
      />
      <div
        className="absolute bottom-0 z-10 flex h-1/3 w-full flex-col-reverse p-4"
        style={{
          background:
            "linear-gradient(0deg, #AB90F4 0%, rgba(217, 217, 217, 0.00) 100%)",
        }}
      >
        <h3 className="text-xl font-bold text-white md:text-3xl lg:text-4xl">
          {props.title}
        </h3>
      </div>
      <div className="absolute bottom-0 right-0 z-20 m-4 h-16 w-12">
        <Image
          fill
          src={props.illustrationSrc}
          alt={props.illustrationAlt}
          className="h-full w-full"
        />
      </div>
    </div>
  );
};
