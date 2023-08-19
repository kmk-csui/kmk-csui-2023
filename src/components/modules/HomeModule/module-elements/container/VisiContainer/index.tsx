import React from "react";

export const VisiContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="col-span-4 flex flex-col gap-6 md:col-span-2">
      <h2 className="text-4xl font-bold lg:text-5xl">Visi</h2>
      {children}
    </div>
  );
};
