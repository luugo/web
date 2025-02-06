'use client'
import {Route} from "@/routers/types";
import Link from "next/link";
import React, {FC, useEffect, useState} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useUserContext} from "@/context";
import {useLocalStorage} from "react-use";
import {AuthenticationPostDefaultResponse} from "@api";

export interface CommonLayoutProps {
  children?: React.ReactNode;
}

const pages: {
  name: string;
  link: Route;
}[] = [
  {
    name: "Conta",
    link: "/account",
  },
  {
    name: " Meus itens",
    link: "/account-rentable",
  },
  {
    name: "Trocar Senha",
    link: "/account-password",
  },
];

const CommonLayout: FC<CommonLayoutProps> = ({children}) => {
  const pathname = usePathname();
  const router = useRouter();
  const {firstName, lastName, place} = useUserContext();
  const [_place, setPlace] = useState<string>('');
  const [_firstName, setFirstName] = useState<string>('');
  const [_lastName, setLastName] = useState<string>('');
  const [auth, ] = useLocalStorage<AuthenticationPostDefaultResponse|null>('auth', null);
  useEffect(() => {
    if (auth) {
      if (auth.token) {
        const user = auth.user;
        if (user) {
          setFirstName(user.firstName);
          setLastName(user.lastName);
          setPlace(user.place);
        }
      } else {
        router.push("/login");
      }
    }
  }, [firstName, lastName, place]);

  return (
    <div className="nc-AccountCommonLayout container">
      <div className="mt-14 sm:mt-20">
        <div className="max-w-4xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-3xl xl:text-4xl font-semibold">Conta</h2>
            <span className="block mt-4 text-neutral-500 dark:text-neutral-400 text-base sm:text-lg">
              <span className="text-slate-900 dark:text-slate-200 font-semibold">
                {_firstName || 'Nome'}
                {_lastName.length > 0 ? ` ${_lastName}` : null}
              </span>{" "}
              · {_place || 'Local'}
            </span>
          </div>
          <hr className="mt-10 border-slate-200 dark:border-slate-700"></hr>

          <div className="flex space-x-8 md:space-x-14 overflow-x-auto hiddenScrollbar">
            {pages.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.link}
                  className={`block py-5 md:py-8 border-b-2 flex-shrink-0 text-sm sm:text-base ${
                    pathname === item.link
                      ? "border-primary-500 font-medium text-slate-900 dark:text-slate-200"
                      : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
          <hr className="border-slate-200 dark:border-slate-700"></hr>
        </div>
      </div>
      <div className="max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
        {children}
      </div>
    </div>
  );
};

export default CommonLayout;
