"use client";

import React from "react";

const SearchRentableSkeleton: React.FC = () => {
  return (
    <div className="bg-white 2xl:w-[45%] xl:w-[55%] lg:w-[60%] md:w-[85%] w-full shadow-md ring-2 rounded-full flex items-center justify-between ring-slate-100 h-[56px] p-1 gap-2">
      <div className="h-[50%] ml-4 bg-gray-300 rounded shimmer flex-1"></div>
      <div className="h-[50%] ml-2 bg-gray-300 rounded shimmer flex-1"></div>
      <div className="w-[48px] h-[48px] flex-shrink-0 bg-gray-300 shimmer rounded-full"></div>
    </div>
  );
};

export default SearchRentableSkeleton;
