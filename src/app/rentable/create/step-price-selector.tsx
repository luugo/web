import React from "react";
import {
  FieldErrors,
  useFormContext,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { zodFormData } from "./page";
import { motion } from "framer-motion";
import Input from "@/shared/Input/Input";
import { RentableBillingFrequencyEnum } from "@api";

interface DetailsStepProps {
  register: UseFormRegister<zodFormData>;
  errors: FieldErrors<zodFormData>;
  setValue: UseFormSetValue<zodFormData>;
  trigger: UseFormTrigger<zodFormData>;
  billingFrequency: string;
  setBillingFrequency: (billingFrequency: RentableBillingFrequencyEnum) => void;
}

const priceTypes = [
  { value: "NEGOTIABLE", label: "Negociável" },
  { value: "HOURLY", label: "Por hora" },
  { value: "DAILY", label: "Por dia" },
  { value: "WEEKLY", label: "Por semana" },
  { value: "MONTHLY", label: "Por mês" },
  { value: "YEARLY", label: "Por ano" },
];

const PriceSelectorStep = ({
  errors,
  register,
  billingFrequency,
  setBillingFrequency,
}: DetailsStepProps) => {
  return (
    <div className="p-4 m-auto">
      <h2 className="text-xl font-bold mb-4">
        Escolha como você vai cobrar pelo que está sendo anunciado.
      </h2>
      <h2 className="text-base mb-10">
        Um preço bem calculado pode atrair muitos clientes! Se o valor do seu
        anúncio não for fixo, você pode marcar a opção Negociável e permitir que
        os interessados façam propostas. Escolha um preço competitivo e maximize
        suas oportunidades de negócio.
      </h2>

      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {priceTypes.map((type) => (
          <motion.div
            key={type.value}
            whileTap={{ scale: 0.9 }}
            className={`px-4 py-2 border-2 rounded-lg text-center cursor-pointer transition-all border-blue-950
            ${billingFrequency === type.value ? "text-white bg-blue-950" : "text-blue-950"}`}
            onClick={() => {
              setBillingFrequency(type.value as RentableBillingFrequencyEnum);
              register("billingFrequency").onChange({
                target: { value: type.value },
              });
            }}
          >
            {type.label}
          </motion.div>
        ))}
      </div>
      {errors.billingFrequency && (
        <p className="text-red-500">{errors.billingFrequency.message}</p>
      )}

      {billingFrequency !== "NEGOTIABLE" && (
        <div className="flex justify-center">
          <div className="flex items-center rounded-2xl border border-gray-200 pl-5">
            <span className="font-light  text-stone-600">R$</span>
            <Input
              type="number"
              {...register("price")}
              placeholder="0,00"
              prefix="R$"
              className="border-none ml-4 border-transparent focus:border-transparent focus:ring-0"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceSelectorStep;
