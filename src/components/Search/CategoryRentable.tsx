import { useEffect, useRef, useState } from "react";
import { Category, CategoryApi, Place } from "@api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import useLocalStorage, { InitialValue } from "@/hooks/useLocalStorage";
import useDataSearch from "./dataSearch";

const CategoryRentable = () => {
  const { categoryId, activeCategories, setCategoryId } = useDataSearch();
  const [categories, setCategories] = useState<Array<Category>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [totalWidth, setTotalWidth] = useState<number>(0);
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);
  const [place] = useLocalStorage<Place | null>(
    "selectedPlace",
    InitialValue<Place>("selectedPlace"),
  );

  const itemsRef = useRef<(HTMLLabelElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryApi = new CategoryApi();
      try {
        const response = await categoryApi.categoryActiveGet({
          place: place?.id,
        });
        setCategories(response);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategories();
  }, [place]);

  useEffect(() => {
    const updateSizes = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
      if (itemsRef.current.length > 0) {
        setTotalWidth(
          itemsRef.current.reduce(
            (acc, item) => acc + (item?.offsetWidth ?? 0),
            0,
          ) + Math.max(0, itemsRef.current.length * 32 + 32),
        );
      }
    };
    setTimeout(updateSizes, 50);

    window.addEventListener("resize", updateSizes);
    return () => window.removeEventListener("resize", updateSizes);
  }, [categories, activeCategories]);

  if (!categories) return <div>Carregando...</div>;

  const getOffset = (index: number) =>
    itemsRef.current
      .slice(0, index)
      .reduce((acc, item) => acc + (item?.offsetWidth ?? 0), 0) +
    index * 32;

  const canAdvance = () =>
    getOffset(currentIndex + 1) + containerWidth <= totalWidth;

  const handleNext = () => {
    if (canAdvance()) setCurrentIndex((prev) => prev + 2);
  };

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 2);
  };

  const handleCategoryClick = (_categoryId: string) => {
    setCategoryId(_categoryId === categoryId ? undefined : _categoryId);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden my-2 md:my-10"
    >
      <div
        className="flex gap-8 transition-transform duration-300 justify-center"
        style={{
          transform: `translateX(-${getOffset(currentIndex)}px)`,
        }}
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
              className={`px-2 ${
                isAvailable ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              key={category.id}
              onMouseOver={
                isAvailable ? () => setHoveredCategory(index) : undefined
              }
              onMouseLeave={() => setHoveredCategory(null)}
              onClick={onClick}
              ref={(el) => (itemsRef.current[index] = el)}
            >
              <span className="flex flex-col items-center relative">
                <div
                  className={`h-10 w-full min-w-10 max-w-20 *:h-full bg-center p-2 box-border flex items-center justify-center ${
                    colorSVG
                  }`}
                  dangerouslySetInnerHTML={{ __html: category.iconSvg ?? "" }}
                ></div>
                <span
                  className={`text-xs font-medium whitespace-nowrap ${
                    colorText
                  }`}
                >
                  {category.title}
                </span>
                <div
                  className={`w-full h-[2px] bg-slate-900 transition-opacity duration-300 mt-2 ${
                    isActive || isHovered ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </span>
            </label>
          );
        })}
      </div>

      {currentIndex > 0 && (
        <div
          className="absolute left-0 top-1/2 transform -translate-y-1/2 h-full flex items-center 
  bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent w-20"
        >
          <button
            onClick={handlePrev}
            className="w-10 h-10 aspect-square bg-white p-2 rounded-full shadow flex items-center justify-center mr-1"
          >
            <FontAwesomeIcon
              className="*:fill-slate-600"
              icon={faChevronLeft}
            />
          </button>
        </div>
      )}

      {canAdvance() && (
        <div
          className="absolute right-0 top-1/2 transform -translate-y-1/2 h-full flex items-center justify-end 
  bg-gradient-to-l from-slate-50 via-slate-50/90 to-transparent w-20"
        >
          <button
            onClick={handleNext}
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
