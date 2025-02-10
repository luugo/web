"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Heading from "@/components/Heading/Heading";

import CategoryStep from "./step-category";
import DetailsStep from "./step-details";
import { useJsApiLoader } from "@react-google-maps/api";
import ImagesStep from "./step-images";


const schema = z.object({
  category: z.string().min(1, "Selecione uma categoria"),
  title: z.string().min(3, "O título é obrigatório"),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres"),
  geolocation: z.object({
    x: z.number().min(-90).max(90, "Latitude inválida"),
    y: z.number().min(-180).max(180, "Longitude inválida"),
  }),
  images: z.array(z.instanceof(File)).min(1, "Pelo menos uma imagem é necessária").max(10, "Máximo de 10 imagens"),
  subcategory: z.string().min(1, "Selecione uma subcategoria"),
  priceType: z.enum(["negotiable", "hourly", "daily", "weekly", "monthly", "yearly"]),
  price: z.string().optional()
});

const steps = ["Categoria", "Detalhes", "Fotos", "Subcategoria", "Preço"];

const RentableCreate = () => {
  const [step, setStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  type FormData = z.infer<typeof schema>;

  const { register, handleSubmit, watch, setValue, trigger, formState: { errors } } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: { images: [], priceType: "negotiable", category: "" },
    });

  const watchPriceType = watch("priceType");

  const nextStep = async () => {
    const fieldsPerStep = [1, 3, 1, 2];
    const stepKeys = Object.keys(schema.shape).slice(
      fieldsPerStep.slice(0, step).reduce((acc, val) => acc + val, 0),
      fieldsPerStep.slice(0, step + 1).reduce((acc, val) => acc + val, 0)
    );

    const isValid = await trigger(stepKeys as (keyof FormData)[]);
    if (isValid) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data: any) => {
    console.log("Formulário enviado:", data);
  };



  return (
    <div className="max-w-7xl py-6 sm:px-6 lg:px-8 mx-auto p-4 min-w-0.5">
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
        {step === 1 && <DetailsStep register={register} trigger={trigger} errors={errors} userLocation={userLocation} setValue={setValue} setUserLocation={setUserLocation} />}
        {step === 2 && <ImagesStep setValue={setValue} trigger={trigger} errors={errors} previewImages={previewImages} setPreviewImages={setPreviewImages} />}

        {step === 3 && (
          <div>
            <label>Subcategoria:</label>
            <input type="text" {...register("subcategory")} />
            {errors.subcategory && <p>{errors.subcategory.message}</p>}
          </div>
        )}

        {step === 4 && (
          <div>
            <label>Preço:</label>
            <select {...register("priceType")}>
              <option value="negotiable">Negociável</option>
              <option value="hourly">Por hora</option>
              <option value="daily">Por dia</option>
              <option value="weekly">Por semana</option>
              <option value="monthly">Por mês</option>
              <option value="yearly">Por ano</option>
            </select>
            {errors.priceType && <p>{errors.priceType.message}</p>}

            {watchPriceType !== "negotiable" && (
              <input type="text" {...register("price")} placeholder="Valor" />
            )}
          </div>
        )}
      </motion.div>

      <div className="flex justify-center gap-5 mt-4">
        {step > 0 && <button onClick={prevStep} className="px-4 py-2 bg-gray-300">Voltar</button>}
        {step < steps.length - 1 ? (
          <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white">Próximo</button>
        ) : (
          <button onClick={handleSubmit(onSubmit)} className="px-4 py-2 bg-green-500 text-white">Enviar</button>
        )}
      </div>
    </div>
  );
}

export default RentableCreate;