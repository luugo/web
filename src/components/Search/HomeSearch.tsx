import CategoryRentable from "./CategoryRentable";
import SearchRentable from "./SearchRentable";

const HomeSearch = () => {
  return (
    <div className="flex flex-col items-center">
      <SearchRentable />
      <CategoryRentable />
    </div>
  );
};

export default HomeSearch;
