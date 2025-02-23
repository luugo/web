"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { Place, PlaceApi, PlaceGetRequest } from "@api";
import { Select } from "@headlessui/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useDataSearch from "./dataSearch";

const SelectPlace = () => {
  const router = useRouter();
  const { places, setPlaces } = useDataSearch();
  const [selectedPlace, setSelectedPlace] = useLocalStorage<Place | null>(
    "selectedPlace",
    null,
  );

  const handleSelectPlace = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected =
      places.find((item) => item.id === event.target.value) || null;

    if (selected) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("p", selected.id);
      router.replace(`?${urlParams.toString()}`);

      setPlaces([
        ...(selectedPlace ? [selectedPlace] : []),
        ...places.filter((place) => place.id !== selected.id),
      ]);

      setSelectedPlace(selected);
    }
  };

  useEffect(() => {
    (async () => {
      const placesApi = new PlaceApi();
      const requestParameters: PlaceGetRequest = { isActive: true };

      const response = await placesApi?.placeGet(requestParameters);

      const filteredPlaces = response.filter(
        (place) =>
          place.id && (!selectedPlace || place.id !== selectedPlace.id),
      );

      setPlaces(filteredPlaces);
    })();
  }, [selectedPlace, setPlaces]);

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
    <>
      <div className="py-1">
        <Select
          className={
            "border-none h-full min-w-[273px] bg-transparent focus:outline-none focus:ring-2 focus:ring-teal-400 hover:ring-2 hover:ring-slate-200 ring-teal-400 text-base rounded-full inline-block"
          }
          onChange={handleSelectPlace}
          value={selectedPlace ? selectedPlace?.id : undefined}
        >
          <option key={0} value={undefined}>
            {selectedPlace
              ? `${selectedPlace.city} - ${selectedPlace.state}`
              : "Brasil"}
          </option>
          {places.length &&
            places?.map((item: Place) => (
              <option key={item.id} value={item.id}>
                {item.city} - {item.state}
              </option>
            ))}
        </Select>
      </div>
    </>
  );
};

export default SelectPlace;
