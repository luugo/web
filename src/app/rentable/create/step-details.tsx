import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import Map from "./map";
import Input from "@/shared/Input/Input";
import Textarea from "@/shared/Textarea/Textarea";
import { zodFormData } from "./page";
import { useEffect, useState } from "react";
import { Place, PlaceApi } from "@api";
import { useRouter } from "next/navigation";
import Select from "@/shared/Select/Select";

interface DetailsStepProps {
  errors: FieldErrors<zodFormData>;
  setGeolocation: (location: { x: number; y: number }) => void;
  geolocation: { x: number; y: number };
  register: UseFormRegister<zodFormData>;
  setValue: UseFormSetValue<zodFormData>;
  trigger: UseFormTrigger<zodFormData>;
  place: string | null;
  setPlace: (place: string | null) => void;
  location: string | null;
  setLocation: (location: string | null) => void;
}

const DetailsStep = ({
  errors,
  register,
  geolocation,
  setGeolocation,
  setValue,
  trigger,
  place,
  setPlace,
  location,
  setLocation,
}: DetailsStepProps) => {
  const router = useRouter();
  const [options, setOptions] = useState<Place[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const placeApi = new PlaceApi();
        const result = await placeApi.placeGet({ isActive: true });
        setOptions(result);
      } catch (error) {
        console.error("Erro ao buscar opções da API", error);
      }
    })();
  }, [router]);

  return (
    <div className="p-4 m-auto">
      <h2 className="text-xl font-bold mb-4">Descreva o que será anunciado!</h2>
      <h2 className="text-base mb-10">
        Coloque algumas informações importantes como o título, a descrição e a
        localização do seu anúncio.
      </h2>

      <label className="font-bold ">Título:</label>
      <Input className="mb-2" {...register("title")} />
      {errors.title && (
        <p className="mb-4 text-red-500">{errors.title.message}</p>
      )}

      <label className="mt-4 font-bold ">Descrição:</label>
      <Textarea className="mb-2" {...register("description")}></Textarea>
      {errors.description && (
        <p className="mb-4 text-red-500">{errors.description.message}</p>
      )}

      <label className="block">
        <label className="mt-4 font-bold ">Localização:</label>
        <Select
          {...register("place")}
          className="mt-1.5"
          value={place as string}
          onChange={(e) => setPlace(e.target.value)}
        >
          <option value="">Selecione...</option>
          {options.map((option) => (
            <option key={`${option.id}`} value={`${option.id}`}>
              {`${option.city}, ${option.state}`}
            </option>
          ))}
        </Select>
      </label>
      {errors.place && (
        <p className="mb-4 text-red-500">{errors.place.message}</p>
      )}
      <Map
        location={location}
        setLocation={setLocation}
        geolocation={geolocation}
        errors={errors}
        setGeolocation={setGeolocation}
        setValue={setValue}
        trigger={trigger}
        register={register}
      />
    </div>
  );
};

export default DetailsStep;
