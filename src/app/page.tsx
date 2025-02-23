"use client";

import React, { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  CategoryApi,
  Place,
  Rentable,
  RentableApi,
  RentableSearchInputGetRequest,
} from "@api";
import RentableCard from "@/components/RentableCard/RentableCard";
import RentableCardSkeleton from "@/components/Skeleton/RentableCard";
import HomeSearch from "@/components/Search/HomeSearch";
import useDataSearch from "@/components/Search/dataSearch";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface MobilePopupProps {
  os?: "android" | "ios";
  onClose: () => void;
}

const MobilePopup: React.FC<MobilePopupProps> = ({ os, onClose }) => {
  const appLinks = {
    android: "https://play.google.com/store/apps/details?id=br.com.luugo.app",
    ios: "https://apps.apple.com/br/app/luugo/id1625096181",
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
        backgroundColor: "#fff",
        boxShadow: "0 -4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "16px 16px 0 0",
        padding: "20px",
        textAlign: "center",
        zIndex: 1000,
      }}
    >
      {/* Logo centralizado no topo */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <img
          src="https://s3.sa-east-1.amazonaws.com/cdn.luugo.com.br/logo.svg"
          alt="Logo"
          width={80}
          height={80}
        />
      </div>

      {/* Texto do popup */}
      <h2
        style={{
          fontSize: "16px",
          marginBottom: "10px",
          color: "#333",
          lineHeight: "1.4",
        }}
      >
        Abra o app para alugar com mais facilidade e rapidez
      </h2>

      {/* Botão principal */}
      {os && (
        <a
          href={appLinks[os]}
          target="_blank"
          rel="noopener noreferrer"
          className={`ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 text-slate-50 dark:text-slate-800 shadow-xl`}
          style={{
            display: "block",
            margin: "10px auto 10px",
            padding: "10px 20px",
            borderRadius: "8px",
            textDecoration: "none",
            maxWidth: "300px",
          }}
        >
          Ir para a Loja
        </a>
      )}

      {/* Botão de "Agora não" */}
      <button
        onClick={onClose}
        style={{
          display: "block",
          margin: "10px auto 10px",
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: "#f8f9fa",
          color: "#333",
          border: "1px solid #ddd",
          cursor: "pointer",
          maxWidth: "300px",
          width: "100%",
          textAlign: "center",
        }}
      >
        Agora não
      </button>
    </div>
  );
};

function PageHome() {
  const pathname = usePathname();
  const router = useRouter();
  const categoryURL = pathname.startsWith("/c/")
    ? pathname.split("/")[2]
    : null;
  const [isMobile, setIsMobile] = useState(false);
  const [os, setOs] = useState<"android" | "ios" | undefined>(undefined);
  const [showPopup, setShowPopup] = useState(true);
  const [selectedPlace] = useLocalStorage<Place | null>("selectedPlace", null);
  const [rentables, setRentables] = useState<Rentable[] | undefined>(undefined);
  const [urlReady, setUrlReady] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);
  const {
    searchTerm,
    setSearch,
    categoryId,
    setActiveCategories,
    setCategoryId,
  } = useDataSearch();

  const isUUID =
    categoryURL &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      categoryURL,
    );

  useEffect(() => {
    const userAgent = navigator.userAgent;
    const mobile = /android|iphone|ipad|ipod/i.test(userAgent);
    setIsMobile(mobile);

    if (/android/i.test(userAgent)) {
      setOs("android");
    } else if (/iPad|iPhone|iPod/.test(userAgent)) {
      setOs("ios");
    }
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setSearchQuery(urlParams.get("s"));

    if (isUUID) {
      setCategoryId(categoryURL);
    }
    if (searchQuery) {
      setSearch(searchQuery);
    }
    if (searchTerm) {
      urlParams.set("s", searchTerm);
      router.replace(`?${urlParams.toString()}`);
    }
    setUrlReady(true);
  }, [
    categoryURL,
    searchQuery,
    setCategoryId,
    setSearch,
    isUUID,
    router,
    searchTerm,
  ]);

  useEffect(() => {
    if (!urlReady) return;

    const rentableApi = new RentableApi();
    const categoryApi = new CategoryApi();

    (async () => {
      let rentables: Rentable[] = [];
      if (searchTerm) {
        const input: RentableSearchInputGetRequest = { input: searchTerm };
        if (categoryId) {
          input.categoryId = categoryId;
        }
        rentables = await rentableApi.rentableSearchInputGet(input);
        const searchCategories = await categoryApi.categorySearchRentableGet({
          input: searchTerm,
        });

        if (searchCategories.length > 0) {
          setActiveCategories(searchCategories.map((category) => category.id!));
        }
      } else if (categoryId) {
        rentables = await rentableApi.rentableGet({
          categoryId,
          place: selectedPlace?.id,
        });
      } else {
        rentables = await rentableApi.rentableNewInTownGet({
          place: selectedPlace?.id || "Natal e Região Metropolitana",
        });
        shuffle(rentables);
      }

      setRentables(rentables);
    })();
  }, [
    selectedPlace?.id,
    searchTerm,
    categoryId,
    urlReady,
    setActiveCategories,
  ]);

  function shuffle(array: Rentable[]) {
    let currentIndex = array.length;

    while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
  }

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="relative overflow-hidden bg-slate-50">
      {isMobile && showPopup && <MobilePopup os={os} onClose={closePopup} />}
      <div className="flex-row justify-center pt-4 md:pt-10 px-4 2xl:px-20 xl:px-20 lg:px-10 md:px-10 sm:px-10">
        <HomeSearch />
        <div className="grid gap-6 pb-10 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {rentables === undefined ? (
            <>
              {[...Array(12)].map((_, index) => (
                <RentableCardSkeleton key={index} />
              ))}
            </>
          ) : rentables.length > 0 ? (
            rentables.map((rentable, index) => (
              <RentableCard rentable={rentable} key={index} />
            ))
          ) : (
            <>
              {[...Array(12)].map((_, index) => (
                <RentableCardSkeleton key={index} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default PageHome;
