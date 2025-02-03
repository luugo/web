"use client";

import React, {useEffect, useState} from "react";
import Prices from "@/components/Prices";
import ModalViewAllReviews from "./ModalViewAllReviews";
import RentableInfo from "@/components/RentableInfo";
import {GoogleMap, LoadScript, Marker} from "@react-google-maps/api";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import {dataProduct} from "./page";
import {UserContact} from "@api";

const ProductDetail = (dataProduct: dataProduct) => {
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);
  const [processedDescription, setProcessedDescription] = useState("");

  const isValidCoordinate = (coord: { lat: any; lng: any }) => {
    return (
      typeof coord.lat === "number" &&
      typeof coord.lng === "number" &&
      isFinite(coord.lat) &&
      isFinite(coord.lng)
    );
  };

  const renderSectionContent = () => {
    return (
      <div className="space-y-7 2xl:space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            {dataProduct.title ?? ""}
          </h2>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={dataProduct.price}
              billingFrequency={dataProduct.billingFrequency}
            />
          </div>
        </div>

        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        <RentableInfo
          {...(dataProduct.user.social as unknown as {
            [key: string]: UserContact;
          })}
        />
      </div>
    );
  };

  const renderDetailSection = () => {
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">Descrição</h2>
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
          <p
            dangerouslySetInnerHTML={{
              __html: processedDescription || "Descrição não disponível",
            }}
          ></p>
        </div>
      </div>
    );
  };

  const handleRenderMap = () => {
    if (
      !isValidCoordinate({
        lat: dataProduct.geolocation.y,
        lng: dataProduct.geolocation.x,
      })
    ) {
      return <p>Mapa não disponível no momento.</p>;
    }

    return (
      <>
        <h2 className="text-2xl font-semibold">Localização</h2>
        <LoadScript googleMapsApiKey="AIzaSyAMYZyR35_t_qG75PyL9JKDGHx_D05wAgc">
          <GoogleMap
            mapContainerStyle={{width: "100%", height: "600px"}}
            center={{
              lat: dataProduct.geolocation.y,
              lng: dataProduct.geolocation.x,
            }}
            zoom={10}
          >
            <Marker
              position={{
                lat: dataProduct.geolocation.y,
                lng: dataProduct.geolocation.x,
              }}
            />
          </GoogleMap>
        </LoadScript>
      </>
    );
  };

  useEffect(() => {
    if (dataProduct.description) {
      setProcessedDescription(dataProduct.description);
    }
  }, [dataProduct.description]);
  return (
    <div className="pb-20 xl:pb-28 lg:pt-14">
      <div className={`nc-ProductDetailPage `}>
        <main className="container mt-5 lg:mt-11">
          <div className="grid gap-8 grid-cols-12">
            <div className="lg:col-span-8 md:col-span-8 col-span-12">
              <ImageGallery images={dataProduct.images}/>
            </div>
            <div className="lg:col-span-4 md:col-span-4 col-span-12">
              {renderSectionContent()}
            </div>
            <div className="lg:col-span-8 md:col-span-8 col-span-12">
              {renderDetailSection()}
            </div>
          </div>

          <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
            <hr className="border-slate-200 dark:border-slate-700"/>
            {handleRenderMap()}
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
