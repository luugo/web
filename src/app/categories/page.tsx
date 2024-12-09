"use client"
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import Input from "@/shared/Input/Input";
import { CategoryApi } from '../../../luugoapi';
import DoesNotExist from '@/components/DoesNotExist/DoesNotExist';
import { CATEGORY } from '@/data/categories';

const Categories: React.FC = () => {
    const [categoriesItems, setCategoriesItems] = useState<any[]>([]);
    const [search, setSearch] = useState<string>('')


    let filteredCategories = categoriesItems?.filter(category => CATEGORY[category?.id]?.title?.toLocaleLowerCase().includes(search?.toLocaleLowerCase()));
    filteredCategories?.sort((a: any, b: any) => CATEGORY[a?.id]?.title?.localeCompare(CATEGORY[b?.id]?.title)); 

    const handleSearchCategoriesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };


    useEffect(() => {
        const fetchCategories = async () => {
            const categoryApi = new CategoryApi();
            const result = await categoryApi?.categoryGet();
            const resultFiltered = result?.filter(r => r?.isActive === true)
            setCategoriesItems(resultFiltered)
        }

        fetchCategories()
    }, [])


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
                <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
                    <form className="relative w-full " method="post">
                        <label
                            htmlFor="search-input"
                            className="text-neutral-500 dark:text-neutral-300"
                        >
                            <Input
                                className="shadow-lg dark:border"
                                id="search-input"
                                type="search"
                                placeholder='Buscar categoria...'
                                value={search}
                                onChange={handleSearchCategoriesChange}
                                sizeClass="pl-14 py-5 pr-5 md:pl-16"
                                rounded="rounded-full"
                            />
                            <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M22 22L20 20"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </label>
                    </form>
                </header>
                <hr className="border-slate-200 dark:border-slate-700" />
                {filteredCategories?.length ? (
                    <div className="grid md:grid-cols-2 gap-6 lg:grid-cols-3 xl:gap-8">
                        {filteredCategories?.map((item) => (
                            <Link href={`/category/${item?.id}`} key={item?.id}>
                                <div
                                    className="p-6 text-center bg-neutral-50 dark:bg-neutral-800 rounded-2xl dark:border-neutral-800"
                                >
                                    <h3 className="text-2xl font-semibold leading-none text-neutral-900 md:text-3xl dark:text-neutral-200">
                                        {CATEGORY[item?.id]?.title}
                                    </h3>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <DoesNotExist title={'categorias'} />
                )
                }
            </div>
        </div>
    )
};

export default Categories;