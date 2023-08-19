import React from "react";

export const FilosofiContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="col-span-4 md:col-span-6 grid grid-cols-4 md:grid-cols-6 gap-8">
      <h2 className="col-span-4 text-4xl font-bold md:col-span-6 lg:text-5xl">
        Filosofi
      </h2>
      {children}
    </div>
  );
};
