import React from "react";
import { MisiCardProps } from "./interface";

export const MisiCard: React.FC<MisiCardProps> = (props: MisiCardProps) => {
  return (
    <div
      className="flex flex-1 items-center rounded-xl p-4 text-sm md:text-base"
      style={{ boxShadow: "1px 1px 10px 1px #8263E8" }}
    >
      {props.misi}
    </div>
  );
};
