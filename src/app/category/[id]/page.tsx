"use client"
import React, { Fragment, useEffect, useState } from 'react';
import Input from "@/shared/Input/Input";
import DoesNotExist from '@/components/DoesNotExist/DoesNotExist';
import { RentableApi, RentableGetRequest } from '../../../../luugoapi';
import { useParams } from 'next/navigation';
import RentableCard from '@/components/RentableCard';
import { CATEGORY } from '@/data/categories';
import useLocalStorage from '@/hooks/useLocalStorage';

interface PlacesProps {
    id: number;
    name: string;
}

const Category: React.FC = () => {
    const params = useParams()
    const categoryId: string = String(params?.id)
    const [items, setItems] = useState<any[]>([])
    const [search, setSearch] = useState<string>('')
    const [filteredRentables, setFilteredRentables] = useState<any[]>([])
    const [places, setPlaces] = useState<PlacesProps[]>([{ id: 0, name: 'Todas Localidades' }]);
    const [selectedPlace, setSelectedPlace] = useState<PlacesProps>({ id: 0, name: 'Todas Localidades' });
    const [selectedLocalPlace, setSelectedLocalPlace] = useState<any>(null);
    const [selectCity] = useLocalStorage<any | null>('selectedPlace', null);
    
    useEffect(() => {
        if (selectCity) {
            setSelectedLocalPlace(selectCity);
        }
      }, [selectCity]);

    useEffect(() => {
        if (!items.length) return;

        const cities = Array.from(new Set(items?.map(i => i?.place)));
        const citiesWithAllOption = [{ id: 0, name: 'Todas Localidades' }, ...cities.map((city, index) => ({ id: index + 1, name: city }))];

        setPlaces(citiesWithAllOption);
        if (!selectedPlace || !citiesWithAllOption.some(place => place.id === selectedPlace.id)) {
            setSelectedPlace(citiesWithAllOption[0]);
        }
    }, [items]);

    const handleSearchItemChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    useEffect(() => {
        const filter = selectedPlace?.id !== 0 ? 
            items?.filter(item => item?.title?.toLocaleLowerCase().includes(search?.toLocaleLowerCase()) && item?.place === selectedPlace?.name) 
            :
            items?.filter(item => item?.title?.toLocaleLowerCase().includes(search?.toLocaleLowerCase()))

        setFilteredRentables(filter)
    }, [items, selectedPlace?.name, selectedPlace?.id, search])

    useEffect(() => {
        const fetchRentables = async () => {
            const rentableApi = new RentableApi()
            const requestParameters: RentableGetRequest = {
                categoryId: categoryId,
            }
            const response = await rentableApi?.rentableGet(requestParameters)
            setItems(response.filter(item => item?.place === selectedLocalPlace?.id))
        }
        fetchRentables()
    }, [selectedLocalPlace])

    const addLink = (item: any) => {
        item.link = `/rentable/${item.id}`;
        return item;
    };

    const rentablesWithLinks = filteredRentables.map(addLink);

    return (
        <div className={`nc-PageCategories`}>
            <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-14">
                <div className="space-y-10 lg:space-y-34">
                    <div className="max-w-screen-sm">
                        <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
                            {CATEGORY[categoryId].title}
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
                                placeholder='Buscar itens...'
                                value={search}
                                onChange={handleSearchItemChange}
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
               
                {filteredRentables?.length ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
                        {rentablesWithLinks?.map((item, index) => (
                            <RentableCard data={item} key={index} />
                        ))}
                    </div>
                ) : (
                    <DoesNotExist title={'anúncios'} />
                )
                }
            </div>
        </div>
    )
};

export default Category;