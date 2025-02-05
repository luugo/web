"use client"
import React, {useEffect, useState} from 'react';
import Link from "next/link";
import {Category, CategoryApi, CategoryGetRequest, CategoryGetTypeEnum} from '@api';
import DoesNotExist from '@/components/DoesNotExist/DoesNotExist';
import {useParams} from "next/navigation";

const CategoryType: React.FC = () => {
  const categoryTranslations: Record<CategoryGetTypeEnum, string> = {
    [CategoryGetTypeEnum.Place]: "Lugar",
    [CategoryGetTypeEnum.Item]: "Item",
    [CategoryGetTypeEnum.Service]: "Serviço",
    [CategoryGetTypeEnum.Auto]: "Auto",
  };
  const params = useParams();
  const [categories, setCategories] = useState<CategoryGetTypeEnum[]>([]);

  useEffect(() => {
    // Converte os valores do enum para um array
    const enumValues = Object.values(CategoryGetTypeEnum) as CategoryGetTypeEnum[];
    setCategories(enumValues);
  }, []);

  return (
    <div className={`nc-PageCategories`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-14">
        <div className="space-y-10 lg:space-y-34">
          <div className="max-w-screen-sm">
            <h5 className="block sm:text-3xl font-semibold">
              🔍 O que você procura?
            </h5>
          </div>
        </div>
        <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
        </header>
        <hr className="border-slate-200 dark:border-slate-700"/>
        {categories?.length ? (
          <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
            {categories.map((categoryType) => (
              <Link href={`/categories/${categoryType.toLowerCase()}`} key={categoryType}>
                <div
                  className="p-6 text-center bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
                >
                  <h3
                    className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
                    {categoryTranslations[categoryType] || categoryType}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <DoesNotExist title={'categorias'}/>
        )
        }
      </div>
    </div>
  )
};

export default CategoryType;