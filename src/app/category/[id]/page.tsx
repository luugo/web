'use client'
import React, {FC, useEffect, useState} from "react";
import RentableCard from "@/components/RentableCard";
import TabFilters from "@/components/TabFilters";
import {CATEGORY_DESCRIPTIONS} from "@/data/categories";
import {CATEGORY_TITLE} from "@/data/categories";
import {Rentable, RentableApi, RentableGetRequest} from "../../../../luugoapi";
import {useParams} from 'next/navigation';

const PageCollection = () => {
    const params = useParams()
    const categoryId:string = String(params.id)
    const [rentables,setRentables] = useState<Rentable[]>([])
    useEffect(() => {
        const rentableApi = new RentableApi()
        const requestParameters: RentableGetRequest = {
            categoryId: categoryId,
        };
        rentableApi.rentableGet(requestParameters).then(setRentables);
    },[])


    return (
        <div className={`nc-PageCollection`}>
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-28">
                <div className="space-y-10 lg:space-y-14">
                    <div className="max-w-screen-sm">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                            {CATEGORY_TITLE[categoryId]}
                        </h2>
                        <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-sm sm:text-base">
                            {
                                CATEGORY_DESCRIPTIONS[categoryId]
                            }
            </span>
                    </div>

                    <hr className="border-slate-200 dark:border-slate-700"/>
                    <main>
                        <TabFilters/>
                        <div
                            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                            {rentables.map((item, index) => (
                                <RentableCard data={item} key={index}/>
                            ))}
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default PageCollection;
