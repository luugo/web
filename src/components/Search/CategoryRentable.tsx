import { useEffect, useRef, useState } from "react";
import { Category, CategoryApi, Place } from "@api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useLocalStorage, { InitialValue } from "@/hooks/useLocalStorage";
import useDataSearch from "./dataSearch";
import CategorySkeleton from "../Skeleton/CategorySkeleton";

const CategoryRentable = () => {
  const { categoryId, activeCategories, setCategoryId } = useDataSearch();
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [place] = useLocalStorage<Place | null>(
    "selectedPlace",
    InitialValue<Place>("selectedPlace"),
  );
  const itemsRef = useRef<(HTMLLabelElement | null)[]>([]);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryApi = new CategoryApi();
      try {
        const response = await categoryApi.categoryActiveGet({
          place: place?.id,
        });
        setCategories(response);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, [place]);

  const updateButtonsVisibility = () => {
    if (!containerRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

    setShowPrev(scrollLeft > 0);
    setShowNext(scrollLeft + clientWidth < scrollWidth);
  };

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (id: string) => {
    setCategoryId(categoryId === id ? undefined : id);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("scroll", updateButtonsVisibility);
      updateButtonsVisibility();
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener(
          "scroll",
          updateButtonsVisibility,
        );
      }
    };
  }, [containerRef.current]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateButtonsVisibility();
    }, 100);

    return () => clearTimeout(timeout);
  }, [categories]);

  if (loading)
    return (
      <div className="relative flex gap-4 w-full overflow-hidden my-2 md:my-10 content-center justify-center">
        {[...Array(17)].map((_, index) => (
          <CategorySkeleton key={index} />
        ))}
      </div>
    );

  return (
    <div className="relative w-full my-2 md:my-10">
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-scroll scroll-smooth justify-center"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category, index) => {
          const isActive = categoryId === category.id;
          const isHovered = hoveredCategory === index;
          const isAvailable =
            activeCategories.includes(category.id!) || !activeCategories.length;
          const onClick = isAvailable
            ? () => handleCategoryClick(category.id!)
            : undefined;

          const colorSVG = isAvailable
            ? "fill-slate-600"
            : isHovered
              ? "fill-slate-900"
              : "fill-slate-200";
          const colorText = isAvailable
            ? "text-slate-600"
            : isHovered
              ? "text-slate-900"
              : "text-slate-200";

          return (
            <label
              key={category.id}
              onMouseOver={
                isAvailable ? () => setHoveredCategory(index) : undefined
              }
              onMouseOut={() => setHoveredCategory(null)}
              className={`px-2 whitespace-nowrap cursor-pointer flex flex-col items-center transition-all duration-100 ${
                isAvailable
                  ? "opacity-100 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={onClick}
              ref={(el) => (itemsRef.current[index] = el)}
            >
              <div
                className={`h-10 w-full min-w-10 max-w-20 *:h-full bg-center p-2 box-border flex items-center justify-center ${colorSVG}`}
                dangerouslySetInnerHTML={{ __html: category.iconSvg ?? "" }}
              ></div>
              <span
                className={`text-xs font-medium whitespace-nowrap ${colorText}`}
              >
                {category.title}
              </span>
              <div
                className={`w-full h-[2px] bg-slate-900 transition-opacity duration-300 mt-2 ${
                  isActive || isHovered ? "opacity-100" : "opacity-0"
                }`}
              ></div>
            </label>
          );
        })}
      </div>
      {showPrev && (
        <div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full flex items-center 
  bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent w-20"
        >
          <button
            onClick={scrollLeft}
            className="w-10 h-10 aspect-square bg-white p-2 rounded-full shadow flex items-center justify-center mr-1"
          >
            <FontAwesomeIcon
              className="*:fill-slate-600"
              icon={faChevronLeft}
            />
          </button>
        </div>
      )}
      {showNext && (
        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full flex items-center justify-end 
  bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent w-20"
        >
          <button
            onClick={scrollRight}
            className="w-10 h-10 aspect-square bg-white p-2 rounded-full shadow flex items-center justify-center ml-1"
          >
            <FontAwesomeIcon
              className="*:fill-slate-600"
              icon={faChevronRight}
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryRentable;
