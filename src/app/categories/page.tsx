import React, { FC } from "react";
import { Category, CategoryApi } from "../../../luugoapi";
import { CATEGORY } from "@/data/categories";

const PageLogin: FC = async () => {
    const categoryApi = new CategoryApi();

    const result = await categoryApi.categoryGet();

    const categories: Category[] = [];
    const subcategories: Category[] = [];

    result.forEach(item => {
        if (item.parentCategoryId === null || item.parentCategoryId === undefined) {
            categories.push(item);
        } else {
            subcategories.push(item);
        }
    });

    categories.sort((a, b) => CATEGORY[a.id].title.localeCompare(CATEGORY[b.id].title));
    subcategories.sort((a, b) => CATEGORY[a.id].title.localeCompare(CATEGORY[b.id].title));
    
    return (
        <div className="relative py-10 lg:py-32 px-10">
            <h1 className="text-3xl md:text-2xl font-semibold px-2">Categorias para aluguel</h1>
            <div className="nc-BackgroundSection xl:rounded-[40px] z-0 bg-neutral-100/70 dark:bg-black/20">
                <ul className="mt-2 md:mt-4 font-normal block text-base sm:text-lg py-2">
                    {categories.map((category) => (
                        <li key={category.id} className="py-2 px-10">
                            <a href={`/category/${category.id}`} className="transition-colors duration-300
                ease-in-out hover:text-blue-500">
                                {CATEGORY[category.id].title}
                            </a>
                            <ul>
                                {subcategories
                                    .filter((subcategory) => subcategory.parentCategoryId === category.id)
                                    .map((subcategory) => (
                                        <li key={subcategory.id} className="text-neutral-500
                      dark:text-neutral-400 text-sm">
                                            <a href={`/category/${subcategory.id}`} className="text-neutral-500
                        dark:text-neutral-400 text-sm transition-colors duration-300
                        ease-in-out hover:text-blue-500">
                                                {CATEGORY[subcategory.id].title}
                                            </a>
                                        </li>
                                    ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PageLogin;
