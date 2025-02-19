import useLocalStorage from "@/hooks/useLocalStorage";
import { Place, PlaceApi, PlaceGetRequest } from "@api";
import { Select } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import useDataSearch from "./dataSearch";
import useViewportSize from "@/utils/useViewportSize";
import TypingPlaceholder from "./TypingPlaceholder";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const SearchRentable = () => {
  const { setSearch, setActiveCategories } = useDataSearch();
  const { width } = useViewportSize();
  const [inputValue, setInputValue] = useState<string>("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useLocalStorage<Place | null>(
    "selectedPlace",
    null,
  );
  const [isFocused, setIsFocused] = useState(false);

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

  const RenderPlaceMobile = ({
    places,
    selectedPlace,
    setSelectedPlace,
  }: {
    places: Place[];
    selectedPlace: Place | null;
    setSelectedPlace: (place: Place | null) => void;
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectPlace = (place: Place) => {
      setSelectedPlace(place);
      setIsOpen(false);
    };

    return (
      <div className="relative w-full">
        <div
          className="border-none h-full bg-transparent w-full pt-6 pb-4 px-4 flex items-center cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon size="1x" icon={faLocationDot} />
          <span className="pl-2">
            {selectedPlace
              ? `${selectedPlace.city} - ${selectedPlace.state}`
              : "Brasil"}
          </span>
        </div>

        {/* Overlay e menu lateral */}
        <div
          className={`fixed inset-0 z-50 transition-all duration-300 ${
            isOpen ? "bg-black/50" : "bg-transparent pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        >
          <div
            className={`fixed top-0 left-0 w-full h-full bg-white shadow-md p-6 transform transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            onClick={(e) => e.stopPropagation()} // Impede que o clique feche o menu ao clicar dentro dele
          >
            <button
              className="absolute top-4 right-4 text-gray-500"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>

            <div className="mt-8">
              {places.length > 0 ? (
                places.map((item) => (
                  <div
                    key={item.id}
                    className="px-4 py-3 text-lg hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectPlace(item)}
                  >
                    {item.city} - {item.state}
                  </div>
                ))
              ) : (
                <div className="px-4 py-3 text-gray-500 text-lg">
                  Nenhuma localização disponível
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSearchSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === "") setActiveCategories([]);
    setSearch(inputValue);
  };

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
        className={`bg-white text-slate-900 2xl:w-[45%] xl:w-[55%] lg:w-[60%] md:w-[85%] w-full shadow-md ring-2 rounded-full flex items-center gap-2 hover:ring-2 hover:ring-slate-200 ${isFocused ? "ring-teal-400" : "ring-slate-100"}`}
        onSubmit={handleSearchSubmit}
      >
        <div className="relative w-full px-5 h-14 inline-flex cntent-center items-center">
          {!isFocused && !inputValue && (
            <span className="placeholder-slate-400 inline-block h-auto">
              <TypingPlaceholder placeholders={placeholders} />
            </span>
          )}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={isFocused ? "" : undefined}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base absolute z-10 left-0 top-0 h-full"
          />
        </div>

        {width >= 768 && <div>{renderPlace()}</div>}
        <button
          type="submit"
          className="px-3 py-3 hover:bg-teal-500 focus:ring-2 bg-teal-400 rounded-full my-1 mr-1"
        >
          <MagnifyingGlassIcon className="w-6 h-6 text-slate-900 fill-current" />
        </button>
      </form>
      {width < 768 && (
        <>
          <RenderPlaceMobile
            places={places}
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
          />
        </>
      )}
    </>
  );
};

export default SearchRentable;
