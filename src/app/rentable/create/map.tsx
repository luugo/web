'use client'

import Input from "@/shared/Input/Input";
import { Library } from "@googlemaps/js-api-loader";
import { useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { zodFormData } from "./page";

const API_KEY = "AIzaSyDMShuuYwAuX9kCx-bIHZPTmLQabKghHW4";
const MAP_ID = "70ed063a6795e38f"

interface LatLong {
  geolocation: { x: number; y: number };
  setGeolocation: (location: { x: number, y: number }) => void;
  setValue: any;
  trigger: any;
  errors: any;
  register: UseFormRegister<zodFormData>;
  place: string | null;
  setPlace: (place: string | null) => void
}

const libs : Library[] = ["core", "places", "maps", "marker"];

const Map = ({geolocation, setGeolocation, place, setPlace, setValue, trigger, register, errors }: LatLong) => {
  const [ map, setMap ] = useState<google.maps.Map | null>(null);
  const [ autocomplete, setAutoComplete ] = useState<google.maps.places.Autocomplete | null>(null);
  const [marker, setMarker] = useState<google.maps.marker.AdvancedMarkerElement | null>(null); // Store the marker

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
          setPlace(place.formatted_address as string);
          setValue("place", place.formatted_address);
          trigger("palce");
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

      const gMap = new google.maps.Map(mapRef.current as HTMLDivElement, mapOptions);
      const gAutoComplete = new google.maps.places.Autocomplete(placeAutoComplereRef.current as HTMLInputElement);
      const initialPosition = new google.maps.LatLng(geolocation.y, geolocation.x);
      const newMarker = new google.maps.marker.AdvancedMarkerElement({
        map: gMap,
        position: initialPosition,
      });
      
      setMarker(newMarker);
      setMap(gMap);
      setAutoComplete(gAutoComplete);

      if (placeAutoComplereRef.current) {
        placeAutoComplereRef.current.value = place as string || "";
      }
      
    }
  }, [isLoaded, geolocation]);

  return (
    <div className="flex flex-col space-y-4">
      <label className="mt-2 font-bold ">Localização:</label>
      <Input ref={placeAutoComplereRef} style={{marginTop: 0}} />
      {errors.place && <p className="mb-4 text-red-500">{errors.place.message}</p>}
      <input type="hidden" {...register("place")} /> 
      {isLoaded ? <div ref={mapRef} className="w-full h-96"></div> : <p>Loading...</p>}
    </div>
  )
}

export default Map;