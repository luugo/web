"use client";

import React, { useEffect, useRef, useState } from "react";
import Prices from "@/components/RentableCard/Prices";
import RentableUserContacts from "@/components/RentableUserContacts";
import dynamic from "next/dynamic";
import { dataRentable } from "./page";
import { UserContact } from "@api";
import { useJsApiLoader } from "@react-google-maps/api";
import { Library } from "@googlemaps/js-api-loader";
import { API_KEY, MAP_ID } from "@/data/keyMaps";

const ImageGallery = dynamic(
  () => import("@/components/ImageGallery/ImageGallery"),
  { ssr: false, loading: () => <p>Carregando imagens...</p> },
);

const libs: Library[] = ["core", "places", "maps", "marker"];

const RentablePage = (dataProduct: dataRentable) => {
  const [processedDescription, setProcessedDescription] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: libs,
  });

  useEffect(() => {
    setIsClient(true);
    if (dataProduct.description) {
      setProcessedDescription(dataProduct.description);
    }
  }, [dataProduct.description]);

  useEffect(() => {
    if (isLoaded && mapRef.current) {
      const mapOptions = {
        center: {
          lat: dataProduct.geolocation.y,
          lng: dataProduct.geolocation.x,
        },
        disableDoubleClickZoom: true,
        zoom: 12,
        mapId: MAP_ID,
      };

      const gMap = new google.maps.Map(
        mapRef.current as HTMLDivElement,
        mapOptions,
      );
      const initialPosition = new google.maps.LatLng(
        dataProduct.geolocation.y,
        dataProduct.geolocation.x,
      );
      new google.maps.marker.AdvancedMarkerElement({
        map: gMap,
        position: initialPosition,
      });

      setMap(gMap);
    }
  }, [isLoaded, dataProduct.geolocation]);

  return (
    <div className="pb-20 xl:pb-28">
      <div className={`nc-ProductDetailPage `}>
        <main className="container mt-1">
          <div className="grid gap-6 grid-cols-12 items-start">
            <div className="pt-6 lg:col-span-12 md:col-span-12 col-span-12">
              <h2 className="text-2xl pb-2 sm:text-3xl font-semibold">
                {dataProduct.title ?? ""}
              </h2>
              <div className="flex items-center">
                <Prices
                  priceClass="text-3xl text-teal-500"
                  frequencyClass="text-base text-slate-400"
                  price={dataProduct.price}
                  billingFrequency={dataProduct.billingFrequency}
                />
              </div>
            </div>
            <div
              className={`rounded-lg overflow-hidden ${
                dataProduct.images.length < 5
                  ? "col-span-12 sm:col-span-12 md:col-span-6 lg:col-span-6"
                  : "lg:col-span-12 md:col-span-12 col-span-12"
              }`}
            >
              {isClient ? (
                <ImageGallery images={dataProduct.images} />
              ) : (
                <p>Carregando imagens...</p>
              )}
            </div>

            <div
              className={`grid grid-cols-subgrid gap-6 ${
                dataProduct.images.length < 5
                  ? "col-span-12 md:col-span-6 sm:col-span-12"
                  : "col-span-12"
              }`}
            >
              <div
                className={`${
                  dataProduct.images.length < 5
                    ? "col-span-12 sm:col-span-12 md:col-span-4 order-2 md:order-2"
                    : "lg:col-span-4 md:col-span-4 col-span-12"
                }`}
              >
                <RentableUserContacts
                  {...(dataProduct.user.social as unknown as {
                    [key: string]: UserContact;
                  })}
                />
              </div>
              {isClient ? (
                <div
                  className={`radius-lg overflow-hidden prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl ${
                    dataProduct.images.length < 5
                      ? "col-span-12 sm:col-span-12 md:col-span-8 order-1 md:order-1"
                      : "lg:col-span-8 md:col-span-8 col-span-12"
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: processedDescription || "Descrição não disponível",
                  }}
                />
              ) : (
                <p>Carregando descrição...</p>
              )}
            </div>
          </div>

          <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
            <hr className="border-slate-200 dark:border-slate-700" />
            <div>
              <h2 className="text-2xl font-semibold">Localização</h2>
              {isLoaded ? (
                <div ref={mapRef} className="w-full h-96"></div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RentablePage;
