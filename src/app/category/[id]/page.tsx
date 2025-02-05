"use client"
import React, {useEffect, useState} from 'react';
import Input from "@/shared/Input/Input";
import DoesNotExist from '@/components/DoesNotExist/DoesNotExist';
import {Category, CategoryApi, CategoryGetRequest, RentableApi, RentableGetRequest} from '../../../../luugoapi';
import {useParams} from 'next/navigation';
import RentableCard from '@/components/RentableCard';
import useLocalStorage from '@/hooks/useLocalStorage';

interface PlacesProps {
  id: number;
  name: string;
}

const Category: React.FC = () => {
  const params = useParams()
  const categoryId: string = String(params?.id)
  const [rentables, setRentables] = useState<any[]>([])
  const [places, setPlaces] = useState<PlacesProps[]>([{id: 0, name: 'Todas Localidades'}]);
  const [selectedPlace, setSelectedPlace] = useState<PlacesProps>({id: 0, name: 'Todas Localidades'});
  const [selectedLocalPlace, setSelectedLocalPlace] = useState<any>(null);
  const [selectCity] = useLocalStorage<any | null>('selectedPlace', null);
  const [category, setCategory] = useState<Category>({title: ''});

  useEffect(() => {
    if (selectCity) {
      setSelectedLocalPlace(selectCity);
    }
  }, [selectCity]);

  useEffect(() => {
    const fetchCategory = async () => {
      const categoryApi = new CategoryApi();
      const requestParams: CategoryGetRequest = {
        id: categoryId,
      }
      const result = await categoryApi?.categoryGet(requestParams);
      setCategory(result[0]);

    }

    fetchCategory()
  }, [])

  useEffect(() => {
    if (!rentables.length) return;

    const cities = Array.from(new Set(rentables?.map(i => i?.place)));
    const citiesWithAllOption = [{id: 0, name: 'Todas Localidades'}, ...cities.map((city, index) => ({
      id: index + 1,
      name: city
    }))];

    setPlaces(citiesWithAllOption);
    if (!selectedPlace || !citiesWithAllOption.some(place => place.id === selectedPlace.id)) {
      setSelectedPlace(citiesWithAllOption[0]);
    }
  }, [rentables]);

  useEffect(() => {
    const fetchRentables = async () => {
      const rentableApi = new RentableApi()
      const requestParameters: RentableGetRequest = {
        categoryId: categoryId,
      }
      const response = await rentableApi?.rentableGet(requestParameters)
      setRentables(response)
    }
    fetchRentables()
  }, [selectedLocalPlace])

  const addLink = (item: any) => {
    item.link = `/rentable/${item.id}`;
    return item;
  };

  const rentablesWithLinks = rentables.map(addLink);

  return (
    <div className={`nc-PageCategories`}>
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-14">
        <div className="space-y-10 lg:space-y-34">
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {category.title}
            </h2>
          </div>
        </div>
        <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
        </header>
        <hr className="border-slate-200 dark:border-slate-700"/>
        {rentables?.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {rentablesWithLinks?.map((item, index) => (
              <RentableCard data={item} key={index}/>
            ))}
          </div>
        ) : (
          <DoesNotExist title={'anúncios'}/>
        )
        }
      </div>
    </div>
  )
};

export default Category;