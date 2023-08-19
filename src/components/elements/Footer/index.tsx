import React from "react";
import { AiFillInstagram } from "react-icons/ai";
export const Footer = () => {
  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-4 rounded-t-3xl bg-[#8263E8] p-8 px-6 font-jakarta text-sm font-bold text-white md:rounded-t-full md:px-16 md:text-base">
      <div className="flex items-center gap-4">
        <p>Made with {"<3"} by ITA KMK 2023</p>
        <a href="https://www.instagram.com/kmk_fasilkomui/" target="_blank">
          <AiFillInstagram size={28} />
        </a>
      </div>
      <p>Copyright © 2023 - KMK Fasilkom UI 2023</p>
    </div>
  );
};
