"use client";

import { useEffect, useState } from "react";
import { RentableApi, Rentable, RentableSearchInputGetRequest } from "@api";
import RentableCard from "@/components/RentableCard/RentableCard";
import RentableCardSkeleton from "@/components/Skeleton/RentableCard";
import useDataSearch from "@/components/Search/dataSearch";

async function getRentablesCategory(id: string) {
  const rentableApi = new RentableApi();
  return await rentableApi.rentableGet({ categoryId: id });
}

async function getRentablesCategorySearch(id: string, searchTerm: string) {
  const rentableApi = new RentableApi();

  const input: RentableSearchInputGetRequest = {
    categoryId: id,
    input: searchTerm,
  };
  return await rentableApi.rentableSearchInputGet(input);
}

export default function Categories({ id }: { id: string }) {
  const { searchTerm } = useDataSearch();
  const [rentables, setRentables] = useState<Rentable[] | null>(null);

  useEffect(() => {
    if (searchTerm) {
      getRentablesCategorySearch(id, searchTerm).then(setRentables);
    } else {
      getRentablesCategory(id).then(setRentables);
    }
  }, [id, searchTerm]);

  return (
    <div className="flex-row justify-center px-4 2xl:px-20 xl:px-20 lg:px-10 md:px-10 sm:px-4">
      <div className="grid gap-6 pb-10 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {rentables ? (
          rentables.length > 0 ? (
            rentables.map((rentable) => (
              <RentableCard key={rentable.id} rentable={rentable} />
            ))
          ) : (
            <p>Nenhum item encontrado.</p>
          )
        ) : (
          <>
            {[...Array(12)].map((_, index) => (
              <RentableCardSkeleton key={index} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
