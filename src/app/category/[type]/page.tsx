"use client";
import React, { useEffect, useState } from "react";
import {
  Category,
  CategoryApi,
  CategoryGetRequest,
  CategoryGetTypeEnum,
} from "@api";
import DoesNotExist from "@/components/DoesNotExist/DoesNotExist";
import { useParams } from "next/navigation";
import UTMLink from "@/components/UTMLink";

const Categories: React.FC = () => {
  const params = useParams();
  const [categories, setCategories] = useState<Category[]>([]);
  const categoryType: CategoryGetTypeEnum | undefined = params?.type
    ? ((Array.isArray(params.type)
        ? params.type[0].toUpperCase()
        : params.type.toUpperCase()) as CategoryGetTypeEnum)
    : undefined;

  useEffect(() => {
    (async () => {
      const categoryApi = new CategoryApi();
      const requestParams: CategoryGetRequest = {
        type: categoryType,
      };
      setCategories(await categoryApi?.categoryGet(requestParams));
    })();
  }, [categoryType]);

  return (
    <div className={`nc-PageCategories`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-14">
        <div className="space-y-10 lg:space-y-34">
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Categorias
            </h2>
          </div>
        </div>
        <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7"></header>
        <hr className="border-slate-200 dark:border-slate-700" />
        {categories?.length ? (
          <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
            {categories?.map((item) => (
              <UTMLink
                href={`/category/${categoryType?.toLowerCase()}/${item?.id}`}
                key={item?.id}
              >
                <div className="p-6 text-center bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800">
                  <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
                    {item.title}
                  </h3>
                </div>
              </UTMLink>
            ))}
          </div>
        ) : (
          <DoesNotExist title={"categorias"} />
        )}
      </div>
    </div>
  );
};

export default Categories;
