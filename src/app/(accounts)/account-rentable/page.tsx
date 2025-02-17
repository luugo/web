"use client";
import Prices from "@/components/RentableCard/Prices";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AuthenticationPostDefaultResponse, Rentable, RentableApi } from "@api";
import { useRouter } from "next/navigation";
import useLocalStorage from "@/hooks/useLocalStorage";
import UTMLink from "@/components/UTMLink";
import { PlusIcon } from "@heroicons/react/24/outline";

const AccountOrder = () => {
  const router = useRouter();
  const [rentables, setRentables] = useState<Rentable[]>([]);
  const [auth] = useLocalStorage<AuthenticationPostDefaultResponse | null>(
    "auth",
    null,
  );

  useEffect(() => {
    (async () => {
      const rentableApi = new RentableApi();
      try {
        if (auth) {
          const renableResp = await rentableApi.rentableGet({
            userId: auth.user?.id,
          });
          if (renableResp) {
            setRentables(renableResp as Rentable[]);
          }
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Erro ao recuperar dados do usuário:", error);
      }
    })();
  }, [auth, router]);

  const renderProductItem = (rentable: Rentable, index: number) => {
    const {
      thumbnail,
      title,
      place,
      price,
      billingFrequency,
      description,
      id,
    } = rentable;

    return (
      <UTMLink
        href={`/rentable/${id}`}
        key={index}
        className="flex py-4 sm:py-7 last:pb-0 first:pt-0"
      >
        <div className="relative h-24 w-16 sm:w-20 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
          <Image
            fill
            sizes="100px"
            src={thumbnail || ""}
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
                </p>
              </div>
              <Prices
                price={price}
                billingFrequency={billingFrequency}
                priceClass="mt-0.5 ml-2"
              />
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
                Visualizar
              </button>
            </div>
          </div>
        </div>
      </UTMLink>
    );
  };

  const renderOrder = ({ myRentables }: { myRentables: Rentable[] }) => {
    return (
      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden z-0">
        <div className="border-slate-200 dark:border-slate-700 p-2 sm:p-8 divide-y divide-y-slate-200 dark:divide-slate-700">
          {myRentables.map(renderProductItem)}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      <h2 className="text-2xl sm:text-3xl font-semibold">Meus Anúncios</h2>
      {rentables.length > 0 ? (
        <>
          <UTMLink
            href="/rentable/create"
            className="flex justify-center bg-gray-100 max-w-7xl py-6 sm:px-6 lg:px-8 hover:text-gray-100 hover:bg-gray-900 rounded-md text-sm font-semibold"
          >
            <PlusIcon aria-hidden="true" className="size-6 mr-2 " />
            <span className="mt-0.5">CADASTRE UM NOVO ANÚNCIO</span>
          </UTMLink>
          {renderOrder({ myRentables: rentables })}
        </>
      ) : (
        <div className="bg-gray-100">
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Você ainda não tem nenhum aluguel.
              </h1>
              <p className="mt-6 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                Considere listar algo para ter a chance de ganhar algum dinheiro
                extra.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <UTMLink
                  href="/rentable/create"
                  className="rounded-md bg-slate-900 hover:bg-slate-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <PlusIcon
                    aria-hidden="true"
                    className="size-6 text-white group-hover:text-white"
                  />
                </UTMLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountOrder;
