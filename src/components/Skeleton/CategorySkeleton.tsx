"use client";
import React from "react";

const CategorySkeleton: React.FC = () => {
  return (
    <div className="px-2 py-[1px]">
      <div className="flex flex-col gap-2 justify-center items-center">
        <div className="p-2">
          <div className="w-[24px] h-[24px] flex-shrink-0 bg-gray-300 shimmer rounded-full"></div>
        </div>
        <div className="w-[70px] h-[16px] flex-shrink-0 bg-gray-300 shimmer rounded-full"></div>
      </div>
    </div>
  );
};

export default CategorySkeleton;
