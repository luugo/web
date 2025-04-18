"use client";

import useLocalStorage from "@/hooks/useLocalStorage";
import { Place } from "@api";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import TypingPlaceholder from "./TypingPlaceholder";
import SearchRentableSkeleton from "../Skeleton/SearchRentableSkeleton";
import { useRouter, useSearchParams } from "next/navigation";
import SelectPlace from "./selectPlace";
import SelectedPlaceMobile from "./selectPlaceMobile";
import useViewportSize from "@/utils/useViewportSize";

const SearchRentable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("s");
  const [selectedPlace] = useLocalStorage<Place | null>("selectedPlace", null);
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState<string>("");
  const { width } = useViewportSize();

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    setInputValue(searchQuery || "");
  }, [searchQuery]);

  const placeholders = [
    "carro...",
    "furadeira...",
    "casa...",
    "passeios...",
    "ferramentas...",
    "móveis...",
    "decoração...",
    "acessórios...",
    "roupas...",
    "eletrônicos...",
    "brinquedos...",
    "instrumentos...",
    "equipamentos...",
    "objetos...",
    "itens...",
  ];

  const handleSearchSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(
      Object.entries({
        s: inputValue || undefined,
        p: selectedPlace?.id,
      })
        .filter(([, value]) => value !== undefined)
        .map(([key, value]) => [key, value!.toString()]),
    );

    router.replace(`/?${params.toString()}`);
  };

  return (
    <>
      {loading ? (
        <SearchRentableSkeleton />
      ) : (
        <>
          <form
            className={`bg-white text-slate-900 2xl:w-[45%] xl:w-[55%] lg:w-[60%] md:w-[85%] w-full shadow-md ring-2 rounded-full flex items-center gap-2 hover:ring-2 hover:ring-slate-200 ${isFocused ? "ring-teal-400" : "ring-slate-100"}`}
            onSubmit={handleSearchSubmit}
          >
            <div className="relative w-full px-5 h-14 inline-flex content-center items-center">
              {!isFocused && !inputValue && (
                <span className="text-slate-400 inline-block h-auto">
                  <TypingPlaceholder placeholders={placeholders} />
                </span>
              )}
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={isFocused ? "" : undefined}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base absolute z-10 left-0 top-0 h-full px-3"
              />
            </div>
            {width >= 768 && <SelectPlace />}
            <button
              type="submit"
              className="px-3 py-3 hover:bg-teal-500 focus:ring-2 bg-teal-400 rounded-full my-1 mr-1"
            >
              <MagnifyingGlassIcon className="w-6 h-6 text-slate-900 fill-current" />
            </button>
          </form>
          {width < 768 && <SelectedPlaceMobile />}
        </>
      )}
    </>
  );
};

export default SearchRentable;
