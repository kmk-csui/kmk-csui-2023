import React from "react";

import { TabsProps } from "./interface";

export const Tabs: React.FC<TabsProps> = ({
  items,
  value = 0,
  setValue,
  className,
}) => {
  return (
    <div className={`flex ${className}`}>
      {items.map((item: any, index: any) => (
        <div
          onClick={() => setValue(index)}
          className={`flex w-full cursor-pointer select-none items-center justify-center text-sm ${
            index === value ? "bg-[#8263E8] font-bold text-white" : ""
          } rounded-full py-3`}
          key={item}
        >
          {index === value ? (
            <div className="">
              <h3>{item}</h3>
            </div>
          ) : (
            <div className="flex w-full justify-center font-semibold">
              <h3>{item}</h3>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
