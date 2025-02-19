import useLocalStorage from "@/hooks/useLocalStorage";
import { Place, PlaceApi, PlaceGetRequest } from "@api";
import { Select } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import useDataSearch from "./dataSearch";

const SearchRentable = () => {
  const { setSearch, setActiveCategories } = useDataSearch();
  const [inputValue, setInputValue] = useState<string>("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useLocalStorage<Place | null>(
    "selectedPlace",
    null,
  );
  const [placeholder, setPlaceholder] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [charIndex, setCharIndex] = useState<number>(0);

  const renderPlace = () => {
    const handleSelectPlace = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selected =
        places.find((item) => item.id === event.target.value) || null;
      setSelectedPlace(selected);
    };
    return (
      <div className="py-1">
        <Select
          className={
            "border-none h-full bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 hover:ring-2 hover:ring-slate-200 ring-teal-400 text-base rounded-full inline-block"
          }
          onChange={handleSelectPlace}
          value={selectedPlace ? selectedPlace?.id : undefined}
        >
          <option key={0} value={undefined}>
            Brasil
          </option>
          {places.length &&
            places?.map((item) => (
              <option key={item.id} value={item.id}>
                {item.city} - {item.state}
              </option>
            ))}
        </Select>
      </div>
    );
  };

  const handleSearchSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === "") setActiveCategories([]);
    setSearch(inputValue);
  };

  useEffect(() => {
    const placeholders = [
      "carro...",
      "furadeira...",
      "casa...",
      "passeios...",
      "ferramentas...",
      "móveis...",
      "decoração...",
      "acessórios...",
      "roupas...",
      "eletrônicos...",
      "brinquedos...",
      "instrumentos...",
      "equipamentos...",
      "objetos...",
      "itens...",
    ];

    const currentText = placeholders[currentIndex];

    const handleTypingEffect = () => {
      if (isDeleting) {
        setPlaceholder((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setPlaceholder(currentText.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }

      if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % placeholders.length);
      }

      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), 500);
      }
    };

    const timeout = setTimeout(handleTypingEffect, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentIndex]);

  useEffect(() => {
    (async () => {
      const placesApi = new PlaceApi();
      const requestParameters: PlaceGetRequest = {
        isActive: true,
      };

      const response = await placesApi?.placeGet(requestParameters);
      const filteredResponse = response.filter(
        (place) => place.id != "Natal/RN",
      );

      setPlaces(filteredResponse);
    })();
  }, []);

  return (
    <>
      <form
        className={`bg-white text-slate-900 2xl:w-[45%] xl:w-[55%] lg:w-[60%] md:w-[85%] sm:w-full shadow-md ring-2 rounded-full flex items-center gap-2 hover:ring-2 hover:ring-slate-200 ${isFocused ? "ring-teal-400" : "ring-slate-100"}`}
        onSubmit={handleSearchSubmit}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={isFocused ? "" : `Busque por ${placeholder}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="px-6 border-none bg-transparent focus:outline-none h-full focus:ring-0 w-full text-base placeholder-slate-400"
        />
        <div className="hidden md:block lg:block xl:block 2xl:block">
          {renderPlace()}
        </div>
        <button
          type="submit"
          className="px-3 py-3 hover:bg-teal-500 focus:ring-2 bg-teal-400 rounded-full my-1 mr-1"
        >
          <MagnifyingGlassIcon className="w-6 h-6 text-slate-900 fill-current" />
        </button>
      </form>
    </>
  );
};

export default SearchRentable;
