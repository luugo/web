import {
  Category,
  CategoryApi,
  CategoryGetRequest,
  CategoryGetTypeEnum,
  ResponseError,
} from "@api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FieldErrors, UseFormSetValue, UseFormTrigger } from "react-hook-form";
import { zodFormData } from "@/app/rentable/create/page";

interface SubcategoryStepProps {
  errors: FieldErrors<zodFormData>;
  setValue: UseFormSetValue<zodFormData>;
  trigger: UseFormTrigger<zodFormData>;
  selectedSubcategory: string | null;
  setSelectedSubcategory: (subcategory: string) => void;
  selectedCategory: CategoryGetTypeEnum | undefined;
}

const SubcategoryStep = ({
  setValue,
  trigger,
  errors,
  selectedSubcategory,
  selectedCategory,
  setSelectedSubcategory,
}: SubcategoryStepProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  const categoryType: CategoryGetTypeEnum | undefined = selectedCategory
    ? ((Array.isArray(selectedCategory)
        ? selectedCategory.toUpperCase()
        : selectedCategory.toUpperCase()) as CategoryGetTypeEnum)
    : undefined;

  const _setSelectedSubcategory = (categoryId: string) => {
    setSelectedSubcategory(categoryId);
  };

  const onSubcategorySelect = (categoryId: string) => {
    _setSelectedSubcategory(categoryId);
    setValue("subcategory", categoryId || "", { shouldValidate: true });
    trigger("subcategory");
  };

  useEffect(() => {
    (async () => {
      try {
        const categoryApi = new CategoryApi();
        const requestParams: CategoryGetRequest = {
          type: categoryType,
          isActive: true,
        };
        setCategories(await categoryApi?.categoryGet(requestParams));
      } catch (error: unknown) {
        if (error instanceof ResponseError) {
          const errorData = await error.response?.json();
          if (errorData) {
            const message = errorData[0]?.message;
            if (message == null) {
              setError("Erro inesperado. Por favor, tente novamente.");
            } else {
              setError(message);
            }
          }
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [categoryType]);

  return (
    <div className="p-4 m-auto">
      <h2 className="text-xl font-bold mb-4">
        Em qual dessas categorias seu anúncio se encaixa?
      </h2>
      <h2 className="text-base mb-10">
        Muitos usuários pesquisam anúncios através das categorias. Por isso é
        importante escolher uma que seja relevante para o seu anúncio.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          <p>Loading subcategories...</p>
        ) : (
          categories.map((sub: Category) => (
            <motion.div
              key={sub.id}
              whileTap={{ scale: 0.9 }}
              className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all border-blue-950 flex flex-col items-center justify-center
            ${selectedSubcategory === sub.id ? "text-white bg-blue-950" : "text-blue-950"}`}
              onClick={() => onSubcategorySelect(sub.id as string)}
            >
              <div
                className={`h-14 w-full min-w-14 max-w-20 *:h-full bg-center p-2 box-border fill-amber-300 flex items-center justify-center`}
                dangerouslySetInnerHTML={{ __html: sub.iconSvg ?? "" }}
              ></div>
              <p className="mt-2 font-semibold">{sub.title}</p>
            </motion.div>
          ))
        )}
      </div>

      {errors.subcategory && (
        <p className="mt-4 text-red-500">
          {errors.subcategory.message || "Erro ao selecionar categoria"}
        </p>
      )}
    </div>
  );
};

export default SubcategoryStep;
