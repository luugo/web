"use client";

import React, { useEffect, useState } from "react";
import Prices from "@/components/Prices";
import ModalViewAllReviews from "./ModalViewAllReviews";
import RentableInfo from "@/components/RentableInfo";
import dynamic from "next/dynamic";
import { dataProduct } from "./page";
import { UserContact } from "@api";

const ImageGallery = dynamic(
  () => import("@/components/ImageGallery/ImageGallery"),
  { ssr: false, loading: () => <p>Carregando imagens...</p> }
);
const GoogleMapComponent = dynamic(
  () => import("@react-google-maps/api").then((mod) => mod.GoogleMap),
  { ssr: false, loading: () => <p>Carregando mapa...</p> }
);
const LoadScriptComponent = dynamic(
  () => import("@react-google-maps/api").then((mod) => mod.LoadScript),
  { ssr: false }
);
const MarkerComponent = dynamic(
  () => import("@react-google-maps/api").then((mod) => mod.Marker),
  { ssr: false }
);

const ProductDetail = (dataProduct: dataProduct) => {
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);
  const [processedDescription, setProcessedDescription] = useState("");
  const [isClient, setIsClient] = useState(false);

  const renderHeader = () => {
    return (
      <>
        <h2 className="text-2xl pb-2 sm:text-3xl font-semibold">
          {dataProduct.title ?? ""}
        </h2>
        <div className="flex items-center">
          <Prices
            contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
            price={dataProduct.price}
            billingFrequency={dataProduct.billingFrequency}
          />
        </div>
      </>
    );
  };

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
          <div className="grid gap-6 grid-cols-12">
            <div className="pt-6 lg:col-span-12 md:col-span-12 col-span-12">
              {renderHeader()}
            </div>
            <div className="lg:col-span-12 md:col-span-8 col-span-12 rounded-lg overflow-hidden">
              {isClient ? (
                <ImageGallery images={dataProduct.images} />
              ) : (
                <p>Carregando imagens...</p>
              )}
            </div>
            <div className="lg:col-span-4 md:col-span-4 col-span-12">
              <RentableInfo
                {...(dataProduct.user.social as unknown as {
                  [key: string]: UserContact;
                })}
              />
            </div>
            <div className="lg:col-span-8 md:col-span-8 col-span-12 radius-lg overflow-hidden">
              <h2 className="text-2xl font-semibold">Descrição</h2>
              <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
                {isClient ? (
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        processedDescription || "Descrição não disponível",
                    }}
                  ></p>
                ) : (
                  <p>Carregando descrição...</p>
                )}
              </div>
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
                    zoom={10}
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

        <ModalViewAllReviews
          show={isOpenModalViewAllReviews}
          onCloseModalViewAllReviews={() => setIsOpenModalViewAllReviews(false)}
        />
      </div>
    </div>
  );
};

export default ProductDetail;
