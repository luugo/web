"use client";

import React, { useEffect, useState } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import {
  Place,
  Rentable,
  RentableApi,
  RentableSearchGetRequest,
  RentableSearchInputGetRequest,
} from "@api";
import RentableCard from "@/components/RentableCard/RentableCard";
import RentableCardSkeleton from "@/components/Skeleton/RentableCard";
import useDataSearch from "@/components/Search/dataSearch";
import { useSearchParams } from "next/navigation";
import PageNoResults from "./no-results";

interface MobilePopupProps {
  os?: "android" | "ios";
  onClose: () => void;
}

const DEFAULT_PLACE: Pick<RentableSearchGetRequest, "xUserLat" | "xUserLon"> = {
  xUserLon: -35.21939757423468,
  xUserLat: -5.8735889811810615,
};

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

      <h2
        style={{
          fontSize: "16px",
          marginBottom: "10px",
          color: "#333",
          lineHeight: "1.4",
        }}
      >
        Abra o app para usar o LuuGo com mais facilidade e rapidez
      </h2>

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
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("s");
  const [isMobile, setIsMobile] = useState(false);
  const [os, setOs] = useState<"android" | "ios" | undefined>(undefined);
  const [showPopup, setShowPopup] = useState(true);
  const [selectedPlace] = useLocalStorage<Place | null>("selectedPlace", null);
  const [rentables, setRentables] = useState<Rentable[] | undefined>(undefined);
  const { searchTerm } = useDataSearch(() => ({
    searchTerm: searchQuery,
  }));
  const [isLoading, setIsLoading] = useState(true);

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
    const rentableApi = new RentableApi();

    (async () => {
      try {
        setIsLoading(true);
        let rentables: Rentable[] = [];

        if (searchTerm) {
          const input: RentableSearchInputGetRequest = { input: searchTerm };
          rentables = await rentableApi.rentableSearchInputGet(input);
        } else {
          const input: RentableSearchGetRequest = {
            xUserLon: selectedPlace?.geolocation?.x ?? DEFAULT_PLACE.xUserLon,
            xUserLat: selectedPlace?.geolocation?.y ?? DEFAULT_PLACE.xUserLat,
          };

          rentables = await rentableApi.rentableSearchGet(input);
        }
        setRentables(rentables);
      } catch (error) {
        if (error instanceof Error) {
          console.error("Error fetching rentables:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    })();
  }, [selectedPlace, searchTerm, searchQuery]);

  const closePopup = () => {
    setShowPopup(false);
  };

  const renderRentables = () => {
    if (isLoading) {
      return (
        <div className="grid gap-6 pb-10 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {[...Array(12)].map((_, index) => (
            <RentableCardSkeleton key={index} />
          ))}
        </div>
      );
    }

    if (!rentables?.length) return <PageNoResults />;

    return (
      <div className="grid gap-6 pb-10 2xl:grid-cols-6 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
        {rentables?.map((rentable, index) => (
          <RentableCard rentable={rentable} key={index} />
        ))}
      </div>
    );
  };

  return (
    <>
      {isMobile && showPopup && <MobilePopup os={os} onClose={closePopup} />}
      <div className="flex-row justify-center px-4 2xl:px-20 xl:px-20 lg:px-10 md:px-10 sm:px-4">
        {renderRentables()}
      </div>
    </>
  );
}
export default PageHome;
