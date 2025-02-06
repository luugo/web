"use client";

import React, {FC, useEffect, useState} from "react";
import {Place, PlaceApi, PlaceGetRequest} from "@api";
import Logo from "@/shared/Logo/Logo";
import MenuBar from "@/shared/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import {XMarkIcon} from "@heroicons/react/24/outline";
import {useRouter} from "next/navigation";
import Select from "@/shared/Select/Select";
import useLocalStorage from "@/hooks/useLocalStorage";

export type MainNav2LoggedProps = object

const MainNavigation: FC<MainNav2LoggedProps> = () => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [selectedPlace, setSelectedPlace] = useLocalStorage<Place|null>('selectedPlace', null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    const selectedLocalPlace = localStorage?.getItem('selectedPlace');
    if (selectedLocalPlace) {
      setSelectedPlace(JSON.parse(selectedLocalPlace));
    }
  }, [setSelectedPlace]);

  useEffect(() => {
    (async () => {
      const placesApi = new PlaceApi();
      const requestParameters: PlaceGetRequest = {
        isActive: true
      };

      const response = await placesApi?.placeGet(requestParameters);
      setPlaces(response);
    })();
  }, []);

  const handleSelectPlace = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = places.find(item => item.id === event.target.value) || null;
    setSelectedPlace(selected);
    localStorage.setItem('selectedPlace', JSON.stringify(selected));
  }

  const handleSearchSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/items?search=${searchTerm}`);
    }
  }

  const renderMagnifyingGlassIcon = () => {
    return (
      <svg
        width={22}
        height={22}
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
    );
  };

  const renderSearchForm = () => {
    return (
      <>
        <form
          className="flex-1 py-2 text-slate-900 dark:text-slate-100"
          onSubmit={handleSearchSubmit}
        >
          <div className="rounded-2xl border-neutral-200 bg-white flex items-center space-x-1.5 px-5 h-full">
            {renderMagnifyingGlassIcon()}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
            />
            <button type="button" onClick={() => {
              setSearchTerm("")
            }}>
              <XMarkIcon className="w-5 h-5"/>
            </button>
          </div>
          <input type="submit" hidden value=""/>
        </form>

      </>
    );
  };

  const renderPlace = () => {
    return (
      <div className="ml-4 mt-4 width-10">
        <Select
          onChange={handleSelectPlace}
          className="w-full"
          value={selectedPlace ? selectedPlace?.id : 'Natal/RN'}
        >
          {places.length &&
            places?.map(item => (
                <option key={item.id} value={item.id}>
                  {item.city} - {item.state}
                </option>
              )
            )}
        </Select>
      </div>
    )
  }

  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between">
        <div className="flex items-center ">
          <MenuBar/>
          <Logo className="flex-shrink-0 hidden md:flex px-5"/>
        </div>

        <div className="flex flex-grow !mx-auto px-10 md:px-0">
          {renderSearchForm()}
        </div>

        <div className="hidden lg:flex px-10 md:px-0">
          {renderPlace()}
        </div>

        <div className="flex items-center justify-end text-slate-700 dark:text-slate-100">
          <AvatarDropdown/>
        </div>
      </div>
    );
  };

  return (
    <div
      className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container ">{renderContent()}</div>
    </div>
  );
};

export default MainNavigation;
