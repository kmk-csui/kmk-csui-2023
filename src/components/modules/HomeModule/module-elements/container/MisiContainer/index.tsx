import React from "react";

export const MisiContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="col-span-4 flex flex-col gap-6">
      <h2 className="text-4xl font-bold lg:text-5xl">Misi</h2>
      {children}
    </div>
  );
};
