import React from 'react';
import { useFormContext, UseFormRegister } from 'react-hook-form';
import { zodFormData } from './page';
import { motion } from 'framer-motion';
import Input from '@/shared/Input/Input';

interface DetailsStepProps {
  errors: any;
  register: UseFormRegister<zodFormData>;
  setValue: any;
  trigger: any;
  billingFrequency: string;
  setBillingFrequency: (billingFrequency: string) => void;
}

const priceTypes = [
  { value: 'NEGOTIABLE', label: 'Negociável' },
  { value: 'HOURLY', label: 'Por hora' },
  { value: 'DAILY', label: 'Por dia' },
  { value: 'WEEKLY', label: 'Por semana' },
  { value: 'MONTHLY', label: 'Por mês' },
  { value: 'YEARLY', label: 'Por ano' },
];

const PriceSelectorStep = ({
  errors,
  register,
  billingFrequency,
  setBillingFrequency
}: DetailsStepProps) => {
  return (
    <div className="p-4 m-auto">
      <h2 className="text-xl font-bold mb-4">Escolha como você vai cobrar pelo que está sendo anunciado.</h2>
      <h2 className="text-base mb-10">Um preço bem calculado pode atrair muitos clientes! Se o valor do seu anúncio não for fixo, você pode marcar a opção Negociável e permitir que os interessados façam propostas. Escolha um preço competitivo e maximize suas oportunidades de negócio.</h2>
      
      <div className="flex flex-wrap justify-center gap-2 mb-4"> {/* Container para os botões */}
        {priceTypes.map((type) => (
          <motion.div
          key={type.value}
          whileTap={{ scale: 0.9 }}
          className={`px-4 py-2 border-2 rounded-lg text-center cursor-pointer transition-all border-blue-950
          ${billingFrequency === type.value? "text-white bg-blue-950" : "text-blue-950"}`}
            onClick={() => {
              setBillingFrequency(type.value);
              register("billingFrequency").onChange({ target: { value: type.value } });
            }}
          >
            {type.label}
          </motion.div>
        ))}
      </div>
      {errors.priceType && <p className="text-red-500">{errors.billingFrequency.message}</p>}

      {billingFrequency !== 'NEGOTIABLE' && (
        <div className='flex justify-center'>
          <Input type="number" {...register('price')} placeholder="R$ 0,00" className="mt-2 px-3 py-2 w-96 text-center" />
        </div>
      )}
    </div>
  );
}

export default PriceSelectorStep;