"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { Place, PlaceApi, PlaceGetRequest } from "@api";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useDataSearch from "./dataSearch";

interface Option {
  value: string;
  label: string;
}

const SelectPlace = () => {
  const router = useRouter();
  const { places, setPlaces } = useDataSearch();
  const [selectedPlace, setSelectedPlace] = useLocalStorage<Place | null>(
    "selectedPlace",
    null,
  );

  // Corrigindo a tipagem do estado
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    setOptions(
      places.map((place) => ({
        value: place.id.toString(), // Certifique-se de que value seja string
        label: `${place.city} - ${place.state}`,
      })),
    );
  }, [places]);

  const handleSelectPlace = (selectedOption: Option | null) => {
    if (!selectedOption) return;

    const selected =
      places.find((item) => item.id.toString() === selectedOption.value) ||
      null;

    if (selected) {
      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set("p", selected.id.toString());
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

      if (urlParams.get("p") !== selectedPlace.id.toString()) {
        urlParams.set("p", selectedPlace.id.toString());
        router.replace(`?${urlParams.toString()}`);
      }
    }
  }, [selectedPlace, router]);

  return (
    <div className="py-1 min-w-[273px]">
      <Select
        options={options}
        onChange={handleSelectPlace}
        value={
          selectedPlace
            ? {
                value: selectedPlace.id.toString(),
                label: `${selectedPlace.city} - ${selectedPlace.state}`,
              }
            : null
        }
        isSearchable
        placeholder="Buscar local..."
        styles={{
          control: (base) => ({
            ...base,
            borderRadius: "9999px",
            border: "none",
            boxShadow: "none",
            ":hover": { borderColor: "teal" },
          }),
        }}
      />
    </div>
  );
};

export default SelectPlace;
