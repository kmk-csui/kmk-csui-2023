import React from "react";

export const BannerWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative grid grid-cols-4 md:grid-cols-6 h-64 md:h-[50vh] lg:h-screen w-full font-jakarta">
      {children}
    </div>
  );
};
