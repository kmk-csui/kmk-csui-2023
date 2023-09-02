import React from "react";

export const MainContentWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="mx-6 grid max-w-7xl grid-cols-4 gap-x-8 gap-y-12 font-jakarta md:mx-12 md:grid-cols-6 lg:mx-16 lg:gap-y-20">
      {children}
    </div>
  );
};
