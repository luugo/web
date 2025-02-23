"use client";

import CategoryRentable from "./CategoryRentable";
import SearchRentable from "./SearchRentable";

const HomeSearch = () => {
  return (
    <div className="flex flex-col items-center gap-6 md:gap-8">
      <SearchRentable />
      <CategoryRentable />
    </div>
  );
};

export default HomeSearch;
