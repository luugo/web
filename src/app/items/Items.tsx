// Items.js
"use client";
import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {RentableApi, RentableSearchInputGetRequest} from '@api';
import RentableCard from '@/components/RentableCard';
import DoesNotExist from '@/components/DoesNotExist/DoesNotExist';

const ItemsContent: React.FC = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const [items, setItems] = useState<any[]>([]);
  const rentableApi = new RentableApi();

  useEffect(() => {
    if (!search) return;

    const requestParameters: RentableSearchInputGetRequest = {
      input: search
    };

    rentableApi.rentableSearchInputGet(requestParameters)
      .then((response) => {
        const rentablesWithLinks = response
          .map((item) => (
            {...item, link: `/rentable/${item.id}`}));

        setItems(rentablesWithLinks);
      })
      .catch(console.error);
  }, [search]);

  return (
    <div className="nc-PageCategories">
      <div className="container py-16 lg:pb-28 lg:pt-20 space-y-16 sm:space-y-20 lg:space-y-14">
        <div className="space-y-10 lg:space-y-34">
          <div className="max-w-screen-sm">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-semibold">
              Resultados de busca
            </h2>
          </div>
        </div>
        <hr className="border-slate-200 dark:border-slate-700"/>

        {items.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-10 mt-8 lg:mt-10">
            {items.map((item) => (
              <RentableCard data={item} key={item.id}/>
            ))}
          </div>
        ) : (
          <DoesNotExist title="anúncios"/>
        )}
      </div>
    </div>
  );
};

export default ItemsContent;
