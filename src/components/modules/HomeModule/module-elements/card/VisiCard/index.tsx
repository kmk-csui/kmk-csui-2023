import React from "react";
import { VisiCardProps } from "./interface";

export const VisiCard: React.FC<VisiCardProps> = (props: VisiCardProps) => {
  return (
    <div
      className="flex flex-1 items-center rounded-xl p-8 text-sm md:text-base"
      style={{ boxShadow: "1px 1px 10px 1px #8263E8" }}
    >
      {props.visi}
    </div>
  );
};
