import { Category, CategoryApi, CategoryGetRequest, CategoryGetTypeEnum } from "@api";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useUnmount } from "react-use";
import { Icon } from "./icons";

interface SubcategoryStepProps {
  setValue: any;
  trigger: any;
  errors: any;
  selectedSubcategory: string | null;
  setSelectedSubcategory: (subcategory: string) => void;
  selectedCategory: CategoryGetTypeEnum | undefined;
}

const SubcategoryStep = ({ setValue, trigger, errors, selectedSubcategory, selectedCategory, setSelectedSubcategory }: SubcategoryStepProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  useUnmount(() => {
    console.log("Unmounted");
    console.log(errors.subcategory)
  })

  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        const categoryApi = new CategoryApi();
        const requestParams: CategoryGetRequest = {
          type: categoryType,
          isActive: true
        };
        setCategories(await categoryApi?.categoryGet(requestParams));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubcategories();
  }, []);

  return (
    <div className="p-4 m-auto">
      <h2 className="text-xl font-bold mb-4">Em qual dessas categorias seu anúncio se encaixa?</h2>
      <h2 className="text-base mb-10">Muitos usuários pesquisam anúncios através das categorias. Por isso é importante escolher uma que seja relevante para o seu anúncio.</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ?
          <p>Loading subcategories...</p> :
          categories.map((sub: Category) => (
            <motion.div
              key={sub.id}
              whileTap={{ scale: 0.9 }}
              className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all border-blue-950
            ${selectedSubcategory === sub.id ? "text-white bg-blue-950" : "text-blue-950"}`}
              onClick={() => onSubcategorySelect(sub.id as string)}
            >
              {<Icon code={sub.icon as number} />}
              <p className="mt-2 font-semibold">{sub.title}</p>
            </motion.div>
          ))}
      </div>

      {errors.subcategory && <p className="mt-4 text-red-500">{errors.subcategory.message || "Erro ao selecionar categoria"}</p>}

    </div>
  );
};

export default SubcategoryStep;