"use client";

import React, { useEffect, useState } from "react";
import Prices from "@/components/RentableCard/Prices";
import RentableUserContacts from "@/components/RentableUserContacts";
import dynamic from "next/dynamic";
import { dataRentable } from "./page";
import { UserContact } from "@api";

const ImageGallery = dynamic(
  () => import("@/components/ImageGallery/ImageGallery"),
  { ssr: false, loading: () => <p>Carregando imagens...</p> },
);
const GoogleMapComponent = dynamic(
  () => import("@react-google-maps/api").then((mod) => mod.GoogleMap),
  { ssr: false, loading: () => <p>Carregando mapa...</p> },
);
const LoadScriptComponent = dynamic(
  () => import("@react-google-maps/api").then((mod) => mod.LoadScript),
  { ssr: false },
);
const MarkerComponent = dynamic(
  () => import("@react-google-maps/api").then((mod) => mod.Marker),
  { ssr: false },
);

const RentablePage = (dataProduct: dataRentable) => {
  const [processedDescription, setProcessedDescription] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (dataProduct.description) {
      setProcessedDescription(dataProduct.description);
    }
  }, [dataProduct.description]);
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
              {isClient && dataProduct.geolocation ? (
                <LoadScriptComponent
                  googleMapsApiKey="AIzaSyAMYZyR35_t_qG75PyL9JKDGHx_D05wAgc"
                  id={`${dataProduct.geolocation.y}:${dataProduct.geolocation.x}`}
                >
                  <GoogleMapComponent
                    mapContainerStyle={{ width: "100%", height: "600px" }}
                    center={{
                      lat: dataProduct.geolocation.y,
                      lng: dataProduct.geolocation.x,
                    }}
                    zoom={14}
                  >
                    <MarkerComponent
                      position={{
                        lat: dataProduct.geolocation.y,
                        lng: dataProduct.geolocation.x,
                      }}
                    />
                  </GoogleMapComponent>
                </LoadScriptComponent>
              ) : (
                <p>Carregando mapa...</p>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RentablePage;
