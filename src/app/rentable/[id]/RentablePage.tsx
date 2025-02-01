"use client";

import { remark } from "remark";
import html from "remark-html";
import React, { useEffect, useState } from "react";
import Prices from "@/components/Prices";
import placeholderSmall from "@/images/placeholder-small.png";
import ModalViewAllReviews from "./ModalViewAllReviews";
import Image from "next/image";
import RentableInfo from "@/components/RentableInfo";
import { useParams } from "next/navigation";
import {
  Rentable,
  RentableApi,
  RentableGetRequest,
  UserContact,
  UserContactApi,
  UserContactGetRequest,
} from "@api";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const ProductDetail = () => {
  const rentableparams = useParams();
  const rentableId: string = String(rentableparams.id);

  const [rentable, setRentable] = useState<Rentable[]>([]);
  const [userContact, setUserContacts] = useState<UserContact[]>([]);
  const [isOpenModalViewAllReviews, setIsOpenModalViewAllReviews] =
    useState(false);

  const position = {
    lat: rentable[0]?.geolocation?.y,
    lng: rentable[0]?.geolocation?.x,
  };

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
            {rentable?.[0]?.title ?? ""}
          </h2>

          <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
            <Prices
              contentClass="py-1 px-2 md:py-1.5 md:px-3 text-lg font-semibold"
              price={rentable?.[0]?.price}
              billingFrequency={rentable?.[0]?.billingFrequency}
            />
          </div>
        </div>

        <hr className=" 2xl:!my-10 border-slate-200 dark:border-slate-700"></hr>
        <RentableInfo data={userContact} />
      </div>
    );
  };

  const renderDetailSection = () => {
    return (
      <div className="">
        <h2 className="text-2xl font-semibold">Descrição</h2>
        <div className="prose prose-sm sm:prose dark:prose-invert sm:max-w-4xl mt-7">
          <p
            dangerouslySetInnerHTML={{ __html: rentable?.[0]?.description }}
          ></p>
        </div>
      </div>
    );
  };

  const handleRenderMap = () => {
    if (!isValidCoordinate(position)) {
      return <p>Mapa não disponível no momento.</p>;
    }

    return (
      <>
        <h2 className="text-2xl font-semibold">Localização</h2>
        <LoadScript googleMapsApiKey="AIzaSyAMYZyR35_t_qG75PyL9JKDGHx_D05wAgc">
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "600px" }}
            center={position}
            zoom={10}
          >
            <Marker position={position} />
          </GoogleMap>
        </LoadScript>
      </>
    );
  };

  useEffect(() => {
    const rentableApi = new RentableApi();
    const idRentable: RentableGetRequest = {
      id: rentableId,
    };

    rentableApi.rentableGet(idRentable).then(async (rentables) => {
      setRentable(rentables);

      const processedContent = await remark()
        .use(html)
        .process(rentables[0].description);

      rentables[0].description = processedContent.toString();

      const userId = rentables[0]?.userId;

      if (userId) {
        const userContactApi = new UserContactApi();
        const requestUserContactParameters: UserContactGetRequest = {
          userId: userId,
        };
        userContactApi
          .userContactGet(requestUserContactParameters)
          .then(setUserContacts);
      }
    });
  }, []);
  return (
    <div className="pb-20 xl:pb-28 lg:pt-14">
      <div className={`nc-ProductDetailPage `}>
        <main className="container mt-5 lg:mt-11">
          <div className="lg:flex">
            <div className="w-full lg:w-[55%] ">
              <div className="relative">
                <div className="aspect-w-16 aspect-h-16 relative">
                  <Image
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    src={rentable[0]?.thumbnail || placeholderSmall}
                    className="w-full rounded-2xl object-cover"
                    alt="product detail 1"
                  />
                </div>
              </div>
            </div>

            <div className="w-full lg:w-[45%] pt-10 lg:pt-0 lg:pl-7 xl:pl-9 2xl:pl-10">
              {renderSectionContent()}
            </div>
          </div>

          <div className="mt-12 sm:mt-16 space-y-10 sm:space-y-16">
            {renderDetailSection()}
            <hr className="border-slate-200 dark:border-slate-700" />

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
