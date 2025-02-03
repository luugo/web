'use client'
import Prices from "@/components/Prices";
import Image from "next/image";
import {useEffect, useState} from "react";
import {AuthenticationPostDefaultResponse, Rentable, RentableApi} from "@api";
import {useRouter} from "next/navigation";
import Link from "next/link";

const AccountOrder = () => {
  const router = useRouter();
  const rentableApi = new RentableApi();
  const [rentables, setRentables] = useState<Rentable[]>([]);
  let storageData: any = null;
  if (typeof window !== 'undefined') {
    storageData = localStorage.getItem('luugo');
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (storageData !== null) {
          const luugo: AuthenticationPostDefaultResponse = JSON.parse(storageData);
          const renableResp = await rentableApi.rentableGet({userId: luugo.user?.id});
          if (renableResp) {
            setRentables(renableResp as Rentable[])
          }
        } else {
          router.push('/login');
        }
      } catch (error) {
        console.error("Erro ao recuperar dados do usuário:", error);
      }
    };

    fetchData();
  }, []);

  const renderProductItem = (product: any, index: number) => {
    const {thumbnail, title, place, price, billingFrequency, description, id} = product;
    return (
      <Link href={`/rentable/${id}`} key={index} className="flex py-4 sm:py-7 last:pb-0 first:pt-0">
        <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            sizes="100px"
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between ">
              <div>
                <h3 className="text-base font-medium line-clamp-1">{title}</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  <span>{place}</span>
                  {/* <span className="mx-2 border-l border-slate-200 dark:border-slate-700 h-4"></span> */}
                </p>
              </div>
              <Prices price={price} billingFrequency={billingFrequency} className="mt-0.5 ml-2"/>
            </div>
          </div>
          <div className="flex flex-1 items-end justify-between text-sm">
            <p className="text-gray-500 dark:text-slate-400 flex items-center">
              <span className="hidden sm:inline-block">{description}</span>
            </p>

            <div className="flex">
              <button
                type="button"
                className="font-medium text-indigo-600 dark:text-primary-500 "
              >
                Visualzar
              </button>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const renderOrder = ({myRentables}: { myRentables: Rentable[] }) => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        <div
          className="border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
          {myRentables.map(renderProductItem)}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">Meus Anúncios</h2>
      {rentables.length > 0 ?
        renderOrder({myRentables: rentables}) :
        <h1>Nenhum item foi encontrado.</h1>}
    </div>
  );
};

export default AccountOrder;
