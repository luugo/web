import { FC, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingUser, faCar, faScrewdriverWrench, faVolleyball } from "@fortawesome/free-solid-svg-icons";
import { CategoryGetTypeEnum } from "@api";

interface CategoryStepProps {
  setValue: any;
  trigger: any;
  errors: any;
  selectedCategory: CategoryGetTypeEnum | undefined;
  setSelectedCategory: (category: CategoryGetTypeEnum) => void;
}

const CategoryStep = ({ setValue, trigger, errors, selectedCategory, setSelectedCategory }: CategoryStepProps) => {

  const _setSelectedCategory = (category: CategoryGetTypeEnum) => {
    setSelectedCategory(category);
  };

  const categories = [
    { id: "item", label: "Item", icon: <FontAwesomeIcon size="5x" icon={faVolleyball} className="text-amber-300" />, description: "Alugue ferramentas, equipamentos e outros objetos." },
    { id: "place", label: "Local", icon: <FontAwesomeIcon size="5x" icon={faBuildingUser} className="text-amber-300" />, description: "Ofereça espaços como casas, salas, escritórios e eventos." },
    { id: "service", label: "Serviço", icon: <FontAwesomeIcon size="5x" icon={faScrewdriverWrench} className="text-amber-300" />, description: "Divulgue serviços como manutenção, transporte, fotografia e mais." },
    { id: "auto", label: "Veículo", icon: <FontAwesomeIcon size="5x" icon={faCar} className="text-amber-300" />, description: "Disponibilize carros, motos, bicicletas ou outros veículos para aluguel." }
  ];

  const onCategorySelect = (category: CategoryGetTypeEnum) => {
    _setSelectedCategory(category);
    setValue("category", category || "", { shouldValidate: true });
    trigger("category");
  };

  return (
    <div className="p-4 m-auto">
      <h2 className="text-xl font-bold mb-4">O que você quer anunciar no LuuGo?</h2>
      <h2 className="text-base mb-10">Aqui você escolhe o tipo de anuncio que quer fazer:</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            whileTap={{ scale: 0.9 }}
            className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all border-blue-950
            ${selectedCategory === cat.id ? "text-white bg-blue-950" : "text-blue-950"}`}
            onClick={() => onCategorySelect(cat.id as CategoryGetTypeEnum)}
          >
            {cat.icon}
            <p className="mt-2 font-semibold">{cat.label}</p>
          </motion.div>
        ))}
      </div>

      {selectedCategory && (
        <motion.p className="mt-4 p-10 text-gray-700 bg-gray-100 rounded-md">
          {categories.find((cat) => cat.id === selectedCategory)?.description}
        </motion.p>
      )}

      {errors.category && <p className="mt-2 text-red-500">{errors.category.message || "Erro ao selecionar categoria"}</p>}

    </div>
  );
};

export default CategoryStep;