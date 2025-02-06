"use client"
import React, {useEffect, useState} from 'react';
import DoesNotExist from '@/components/DoesNotExist/DoesNotExist';
import {Category, CategoryApi, CategoryGetRequest, Place, Rentable, RentableApi, RentableGetRequest} from '@api';
import {useParams} from 'next/navigation';
import RentableCard from '@/components/RentableCard';
import useLocalStorage from '@/hooks/useLocalStorage';
import NotFound from "@/app/not-found";

const CategoryView: React.FC = () => {
  const params = useParams()
  const categoryId: string = String(params?.id)
  const [rentables, setRentables] = useState<Rentable[]>([])
  const [selectedPlace] = useLocalStorage<Place | null>('selectedPlace', null);
  const [category, setCategory] = useState<Category>({title: ''});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    (async () => {
      const categoryApi = new CategoryApi();
      const requestParams: CategoryGetRequest = {
        id: categoryId,
      }
      const response = await categoryApi?.categoryGet(requestParams);

      if (!response || !response[0]) {
        setNotFound(true);
        return;
      }
      setCategory(response[0]);

    })();
  }, [categoryId])

  useEffect(() => {
    (async () => {
      const place = selectedPlace || JSON.parse(localStorage.getItem('selectedPlace') || '');
      const rentableApi = new RentableApi();
      const requestParameters: RentableGetRequest = {
        categoryId: categoryId,
        ...(place && {place: place.id})
      };
      const response = await rentableApi?.rentableGet(requestParameters);
      setRentables(response);
    })();
  }, [categoryId, selectedPlace]);

  if (notFound) return <NotFound />;

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
            {rentables?.map((item, index) => (
              <RentableCard rentable={item} key={index}/>
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

export default CategoryView;