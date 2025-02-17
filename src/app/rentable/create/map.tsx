"use client";

import Input from "@/shared/Input/Input";
import { Library } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { zodFormData } from "./page";
import { API_KEY, MAP_ID } from "@/data/keyMaps";

const libs: Library[] = ["core", "places", "maps", "marker"];

interface LatLong {
  geolocation: { x: number; y: number };
  setGeolocation: (location: { x: number; y: number }) => void;
  errors: FieldErrors<zodFormData>;
  setValue: UseFormSetValue<zodFormData>;
  trigger: UseFormTrigger<zodFormData>;
  register: UseFormRegister<zodFormData>;
  location: string | null;
  setLocation: (location: string | null) => void;
}

const Map = ({
  geolocation,
  setGeolocation,
  location,
  setLocation,
  setValue,
  trigger,
  register,
  errors,
}: LatLong) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [autocomplete, setAutoComplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const [, setMarker] =
    useState<google.maps.marker.AdvancedMarkerElement | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: libs,
  });

  const mapRef = useRef<HTMLDivElement>(null);
  const placeAutoComplereRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autocomplete) {
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const position = place.geometry?.location;

        if (position) {
          setGeolocation({ x: position.lng(), y: position.lat() });
          setValue("geolocation", { x: position.lng(), y: position.lat() });
          trigger("geolocation");
          setLocation(place.formatted_address as string);
          setValue("location", place.formatted_address as string);
        }
      });
    }
  }, [autocomplete, map, setValue, trigger]);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const mapOptions = {
        center: {
          lat: geolocation.y,
          lng: geolocation.x,
        },
        disableDoubleClickZoom: true,
        zoom: 12,
        mapId: MAP_ID,
      };

      const gMap = new google.maps.Map(
        mapRef.current as HTMLDivElement,
        mapOptions,
      );
      const gAutoComplete = new google.maps.places.Autocomplete(
        placeAutoComplereRef.current as HTMLInputElement,
      );
      const initialPosition = new google.maps.LatLng(
        geolocation.y,
        geolocation.x,
      );
      const newMarker = new google.maps.marker.AdvancedMarkerElement({
        map: gMap,
        position: initialPosition,
      });

      setMarker(newMarker);
      setMap(gMap);
      setAutoComplete(gAutoComplete);

      if (placeAutoComplereRef.current) {
        placeAutoComplereRef.current.value = (location as string) || "";
      }
    }
  }, [isLoaded, geolocation]);

  return (
    <div className="flex flex-col space-y-4">
      <label className="mt-2 font-bold ">Endereço:</label>
      <Input ref={placeAutoComplereRef} style={{ marginTop: 0 }} />
      {errors.geolocation && (
        <p className="mb-4 text-red-500 mt-2">{errors.geolocation.message}</p>
      )}
      <input type="hidden" {...register("location")} />
      {isLoaded ? (
        <div ref={mapRef} className="w-full h-96"></div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Map;
