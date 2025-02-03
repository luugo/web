"use client";

import React, { createRef, FC, useState, useEffect } from "react";
import { PlaceApi, PlaceGetRequest } from "../../../luugoapi";
import Logo from "@/shared/Logo/Logo";
import MenuBar from "@/shared/MenuBar/MenuBar";
import AvatarDropdown from "./AvatarDropdown";
import Navigation from "@/shared/Navigation/Navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import Select from "@/shared/Select/Select";
import useLocalStorage from "@/hooks/useLocalStorage";

export interface MainNav2LoggedProps { }

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const inputRef = createRef<HTMLInputElement>();
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [placeItems, setPlaceItems] = useState<any[]>([]);
  const [selectedPlace, setSelectedPlace] = useLocalStorage<any>('selectedPlace', null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const router = useRouter();

  useEffect(() => {
    const selectedLocalPlace = localStorage?.getItem('selectedPlace');
    if (selectedLocalPlace) {
      setSelectedPlace(JSON.parse(selectedLocalPlace));
    }
  }, []);

  useEffect(() => {
    const fetchPlaces = async () => {
      const placesApi = new PlaceApi();
      const requestParameters: PlaceGetRequest = {
        isActive: true
      };

      const response = await placesApi?.placeGet(requestParameters);
      setPlaceItems(response);
    }

    fetchPlaces();
  }, []);

  const handleSelectPlace = (event) => {
    const selected = placeItems.find(item => item.city === event.target.value) || '';
    setSelectedPlace(selected);
    localStorage.setItem('selectedPlace', JSON.stringify(selected));
  }

  const handleSearchSubmit = (e) => {
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
          <div className="bg-slate-50 dark:bg-slate-800 flex items-center space-x-1.5 px-5 h-full rounded">
            {renderMagnifyingGlassIcon()}
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..."
              className="border-none bg-transparent focus:outline-none focus:ring-0 w-full text-base"
              autoFocus
            />
            <button type="button" onClick={() => {
              setSearchTerm("")
            }}>
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
          <input type="submit" hidden value="" />
        </form>
        <div className="ml-4 mt-4 width-10">
          <Select
            onChange={handleSelectPlace}
            className="w-full"
            value={selectedPlace ? selectedPlace?.city : 'Selecionar Local'}
          >
            <option value="Selecionar Local">Selecionar Local</option>
            {placeItems.length &&
              placeItems?.map(item => (
                <option key={item.id} value={item.city}>
                  {item.city} - {item.state}
                </option>
              )
              )}
          </Select>
        </div>
      </>
    );
  };

  const renderContent = () => {
    return (
      <div className="h-20 flex justify-between">
        <div className="flex items-center lg:hidden flex-1">
          <MenuBar />
        </div>

        <div className="lg:flex-1 flex items-center">
          <Logo className="flex-shrink-0" />
        </div>

        <div className="flex-[4] flex !mx-auto px-10 md:px-0">
          {renderSearchForm()}
        </div>

        <div className="flex-[2] hidden lg:flex mx-4">
          <Navigation />
        </div>

        <div className="flex-1 flex items-center justify-end text-slate-700 dark:text-slate-100">
          <AvatarDropdown />
        </div>
      </div>
    );
  };

  return (
    <div className="nc-MainNav2Logged relative z-10 bg-white dark:bg-neutral-900 border-b border-slate-100 dark:border-slate-700">
      <div className="container ">{renderContent()}</div>
    </div>
  );
};

export default MainNav2Logged;
