import React from "react";

export const BannerWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative grid h-64 w-full grid-cols-4 font-jakarta md:h-[50vh] md:grid-cols-6 lg:h-screen">
      {children}
    </div>
  );
};
