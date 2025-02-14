import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import Map from "./map";
import Input from "@/shared/Input/Input";
import Textarea from "@/shared/Textarea/Textarea";
import { zodFormData } from "./page";

interface DetailsStepProps {
  errors: any;
  setGeolocation: (location: { x: number, y: number }) => void
  geolocation: { x: number, y: number };
  register: UseFormRegister<zodFormData>;
  setValue: any;
  trigger: any;
  place: string | null;
  setPlace: (place: string | null) => void
}

const DetailsStep = ({
  errors,
  register,
  geolocation,
  setGeolocation,
  setValue,
  trigger,
  place,
  setPlace
}: DetailsStepProps) => {

  return (

    <div className="p-4 m-auto">
      <h2 className="text-xl font-bold mb-4">Descreva o que será anunciado!</h2>
      <h2 className="text-base mb-10">Coloque algumas informações importantes como o título, a descrição e a localização do seu anúncio.</h2>

      <label className="font-bold ">Título:</label>
      <Input className="mb-2" {...register("title")} />
      {errors.title && <p className="mb-4 text-red-500">{errors.title.message}</p>}

      <label className="mt-4 font-bold ">Descrição:</label>
      <Textarea className="mb-2" {...register("description")}></Textarea>
      {errors.description && <p className="mb-4 text-red-500">{errors.description.message}</p>}

      <Map
        place={place}
        setPlace={setPlace}
        geolocation={geolocation}
        errors={errors}
        setGeolocation={setGeolocation}
        setValue={setValue} trigger={trigger} register={register} />

      {errors.geolocation && <p className="mb-4 text-red-500 mt-2">{errors.geolocation.message}</p>}
    </div>
  );
}

export default DetailsStep;
