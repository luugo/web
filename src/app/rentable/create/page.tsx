"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "@/components/Heading/Heading";

import CategoryStep from "./step-category";
import DetailsStep from "./step-details";
import ImagesStep from "./step-images";
import SubcategoryStep from "./step-subcategory";
import { AuthenticationPostDefaultResponse, CategoryGetTypeEnum, MediaApi, Rentable, RentableApi, RentableBillingFrequencyEnum, ResponseError } from "@api";
import PriceSelectorStep from "./step-price-selector";
import { useLocalStorage } from "react-use";
import { Alert } from "@/shared/Alert/Alert";
import { useRouter } from "next/navigation";
import { File } from "buffer";

export interface zodFormData {
  category: string;
  title: string;
  description: string;
  images: File[];
  categoryId: string; // subcategory
  billingFrequency: "NEGOTIABLE" | "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";
  price: number;
  place: string;
  geolocation: { x: number; y: number };
  location: string;
}

const schema = z.object({
  category: z.string().min(1, "Selecione uma categoria"),
  title: z.string().min(3, "O título é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatório"),
  place: z.string().min(1, "A localização é obrigatório"),
  geolocation: z.object({
    x: z.number().min(-90).max(90, "Latitude inválida"),
    y: z.number().min(-180).max(180, "Longitude inválida"),
  }, {required_error: "O endereço é obrigatório"}),
  images: z.array(z.instanceof(File)).min(1, "Pelo menos uma imagem é necessária").max(10, "Máximo de 10 imagens"),
  subcategory: z.string({required_error: "Selecione uma subcategoria"}),
  billingFrequency: z.enum(["NEGOTIABLE", "HOURLY", "DAILY", "WEEKLY", "MONTHLY", "YEARLY"]),
  price: z.string().optional(),
  location: z.string().optional(),
});

const steps = ["Categoria", "Detalhes", "Fotos", "Subcategoria", "Preço"];

const RentableCreate = () => {
  const [alert, setAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<CategoryGetTypeEnum | undefined>(undefined);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [place, setPlace] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [geolocation, setGeolocation] = useState({ x: 0, y: 0 });
  const [billingFrequency, setBillingFrequency] = useState<RentableBillingFrequencyEnum>("NEGOTIABLE");
  const [auth] = useLocalStorage<AuthenticationPostDefaultResponse | null>("auth", null);
  const router = useRouter();

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } =
    useForm<zodFormData>({
      resolver: zodResolver(schema),
      defaultValues: { images: [], billingFrequency: "NEGOTIABLE", category: "" },
    });

  const nextStep = async () => {
    const fieldsPerStep = [1, 4, 1, 2];
    const stepKeys = Object.keys(schema.shape).slice(
      fieldsPerStep.slice(0, step).reduce((acc, val) => acc + val, 0),
      fieldsPerStep.slice(0, step + 1).reduce((acc, val) => acc + val, 0)
    );

    const isValid = await trigger(stepKeys as (keyof zodFormData)[]);
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: any) => {
    try {
      if(auth) {
        const userId = auth.user?.id as string;

        const body: Rentable = {
          title: data.title,
          description: data.description,
          type: data.category.toUpperCase(),
          place: data.place,
          price: Number(data.price ?? 0),
          discount: 0,
          billingFrequency: billingFrequency,
          userId,
          categoryId: data.subcategory,
          geolocation: {
            x: geolocation.x,
            y: geolocation.y
          }
        }

        const rentableApi = new RentableApi();
        const rentableId = await rentableApi.rentablePost(
          {rentable: body},
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        
        const mediaApi = new MediaApi();
        for (const file of data.images) {
          try {
            await mediaApi.mediaPostRaw(
              {
                rentableId,
                filename: file.name,
                file,
                type: "PHOTO",
                userId,
              },
              {
                headers: {
                  Authorization: `Bearer ${auth.token}`
                },
              }
            );
          } catch (error: any) {
            console.log(error.message);          
          }

          router.push("/account-rentable");
        }
      }
      
    } catch (error: unknown) {
      if (error instanceof ResponseError) {
        setShowAlert(true);
        const errorData = await error.response.json();
        const errorMessage = errorData[0]?.message;
        setAlert(errorMessage ?? "Erro inesperado. Por favor, tente novamente.");
        setTimeout(() => {
          setShowAlert(false);
        }, 5000);
      }
      console.error(error);
    }

  };

  return (
    <div className="max-w-7xl py-6 sm:px-6 lg:px-8 mx-auto p-4 min-w-0.5">
      <div className="absolute top-0 z-max w-full p-4 right-0">
        {showAlert && (
          <Alert type="error" onClick={() => setShowAlert(false)}>
            {alert}
          </Alert>
        )}
      </div>
      <Heading
        className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50"
        fontClass="text-3xl md:text-4xl 2xl:text-5xl font-semibold"
        isCenter
        desc=""
      >
        Cadastro de Anúncio
      </Heading>
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
      >
        {step === 0 && <CategoryStep setValue={setValue} trigger={trigger} errors={errors} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />}
        {step === 1 && <DetailsStep register={register} errors={errors} setValue={setValue} trigger={trigger} place={place} setPlace={setPlace} setGeolocation={setGeolocation} geolocation={geolocation} location={location} setLocation={setLocation} />}
        {step === 2 && <ImagesStep setValue={setValue} trigger={trigger} errors={errors} previewImages={previewImages} setPreviewImages={setPreviewImages} />}
        {step === 3 && <SubcategoryStep setValue={setValue} trigger={trigger} errors={errors} selectedSubcategory={selectedSubcategory} setSelectedSubcategory={setSelectedSubcategory} selectedCategory={selectedCategory}	 />}
        {step === 4 && <PriceSelectorStep register={register} billingFrequency={billingFrequency} setBillingFrequency={setBillingFrequency} setValue={setValue} trigger={trigger} errors={errors} /> }
      </motion.div>

      <div className="flex justify-center gap-5 mt-4">
        {step > 0 && <button onClick={prevStep} className="px-4 py-2 bg-gray-300 hover:bg-gray-200 rounded-md">Voltar</button>}
        {step < steps.length - 1 ? (
          <button onClick={nextStep} className="px-4 py-2 bg-slate-900 hover:bg-slate-800 rounded-md text-white">Próximo</button>
        ) : (
          <button onClick={handleSubmit(onSubmit)} className="px-4 py-2 border-none bg-green-500 hover:bg-green-400 rounded-md text-white">Enviar</button>
        )}
      </div>
    </div>
  );
}

export default RentableCreate;