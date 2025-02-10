import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";

interface FormData {
  category: string;
  title: string;
  description: string;
  images: File[];
  subcategory: string;
  priceType: "negotiable" | "hourly" | "daily" | "weekly" | "monthly" | "yearly";
  geolocation: { x: number; y: number };
  price?: string;
}

interface DetailsStepProps {
  register: UseFormRegister<FormData>;
  errors: any;
  trigger: any;
  setValue: UseFormSetValue<FormData>;
  userLocation: { x: number, y: number };
  setUserLocation: (location: { x: number, y: number }) => void;
}

const DetailsStep = ({
  register,
  errors,
  userLocation,
  setUserLocation,
  trigger,
  setValue
}  : DetailsStepProps) => {

  const apiKey = "AIzaSyANHYePOzb9jOivEZPoORuHfloft05osQE";
  const LIBRARIES: ("places")[] = ["places"];

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: LIBRARIES,
  });
  
  useEffect(() => {
    if (isLoaded) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log('GET LOCATION')
            const { latitude, longitude } = position.coords;
            const location = { x: latitude, y: longitude };
            console.log({location})
            setUserLocation(location);
            setValue("geolocation", location, { shouldValidate: true });
            trigger("geolocation");
          },
          (error) => {
            console.error("Erro ao obter localização:", error);
            setValue("geolocation", { x: 0, y: 0 }, { shouldValidate: true });
            trigger("geolocation");
          },
          { enableHighAccuracy: true }
        );
      } else {
        console.error("Geolocalização não suportada");
        setUserLocation({ x: 0, y: 0 });
        setValue("geolocation", { x: 0, y: 0 }, { shouldValidate: true });
        trigger("geolocation");
      }
    }
  }, [isLoaded, setValue, trigger]);

  return (

    <div className="flex flex-col">
      <div className="form-group">
        <label>Título:</label>
        <input type="text" {...register("title")} />
      </div>
      {errors.title && <p className="mb-4 text-red-500">{errors.title.message}</p>}

      <label className="mt-2">Descrição:</label>
      <textarea {...register("description")} />
      {errors.description && <p className="mb-4 text-red-500">{errors.description.message}</p>}

      {isLoaded && userLocation ? (
        <div className="mt-4">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "400px" }}
            center={{lat: userLocation.x, lng: userLocation.y}}
            zoom={15}
          >
            <Marker position={{lat: userLocation.x, lng: userLocation.y}} />
          </GoogleMap>
        </div>
      ) : (
        <input
          type="text"
          {...register("geolocation")}
          className="border p-2 rounded w-full"
          disabled
          placeholder={isLoaded ? "Fetching Location..." : "Loading Map..."}
        />
      )}
      {errors.localization && <p className="mb-4 text-red-500">{errors.localization.message}</p>}
      {errors.localization && <p className="mb-4 text-red-500">{errors.localization.message}</p>}
    </div>
  );
}

export default DetailsStep;
