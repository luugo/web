import useLocalStorage from "@/hooks/useLocalStorage";
import { Place, PlaceApi, PlaceGetRequest } from "@api";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SelectedPlaceMobile = () => {
  const router = useRouter();
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useLocalStorage<Place | null>(
    "selectedPlace",
    null,
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectPlace = (place: Place) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("p", place.id);
    router.replace(`?${urlParams.toString()}`);

    setSelectedPlace(place);

    setPlaces((prevPlaces) => [
      place,
      ...prevPlaces.filter((p) => p.id !== place.id),
    ]);

    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      const placesApi = new PlaceApi();
      const requestParameters: PlaceGetRequest = { isActive: true };

      const response = await placesApi?.placeGet(requestParameters);

      const filteredPlaces = response.filter(
        (place) => place.id !== selectedPlace?.id,
      );

      setPlaces(
        selectedPlace ? [selectedPlace, ...filteredPlaces] : filteredPlaces,
      );
    })();
  }, [selectedPlace]);

  useEffect(() => {
    if (selectedPlace) {
      const urlParams = new URLSearchParams(window.location.search);

      if (urlParams.get("p") !== selectedPlace.id) {
        urlParams.set("p", selectedPlace.id);
        router.replace(`?${urlParams.toString()}`);
      }
    }
  }, [selectedPlace, router]);

  return (
    <div className="relative w-full">
      <div
        className="border-none h-full bg-transparent w-full px-4 flex items-center cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-4 h-4 flex items-center justify-center">
          <FontAwesomeIcon icon={faLocationDot} />
        </div>
        <span className="pl-2">
          {selectedPlace
            ? `${selectedPlace.city} - ${selectedPlace.state}`
            : "Brasil"}
        </span>
      </div>

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
          onClick={(e) => e.stopPropagation()}
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

export default SelectedPlaceMobile;
