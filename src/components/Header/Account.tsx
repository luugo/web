"use client";

import Avatar from "@/shared/Avatar/Avatar";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AuthenticationPostDefaultResponse } from "@api";
import { Popover } from "@headlessui/react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [auth, setAuth] =
    useLocalStorage<AuthenticationPostDefaultResponse | null>("auth", null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) return null;

  if (!auth) {
    return (
      <ButtonSecondary sizeClass="py-2 px-4 sm:py-2 sm:px-6" href="/login">
        Entrar
      </ButtonSecondary>
    );
  }

  const fullName = [auth.user?.firstName || "Nome", auth.user?.lastName || ""]
    .filter(Boolean)
    .join(" ");

  const handleLogout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
    window.location.reload();
  };

  return (
    <Popover className="relative">
      <Popover.Button as="div">
        <ButtonSecondary
          href="/account"
          className="flex gap-4 border border-slate-300 text-slate-900 !pl-3 !pr-2 md:hidden"
        >
          <FontAwesomeIcon icon={faBars} />
          <Avatar
            imgUrl={auth.user?.thumbnail || "/avatar.jpg"}
            sizeClass="w-6 h-6"
          />
        </ButtonSecondary>

        <ButtonSecondary className="gap-2 border border-slate-300 text-slate-900 pr-2 md:pr-2 md:pl-4 hidden md:flex">
          <FontAwesomeIcon icon={faBars} />
          <Avatar
            imgUrl={auth.user?.thumbnail || "/avatar.jpg"}
            sizeClass="w-6 h-6"
          />
        </ButtonSecondary>
      </Popover.Button>

      <Popover.Panel className="hidden md:block absolute z-10 mt-4 right-0 bg-white shadow-lg rounded-2xl p-2">
        <a
          href="/account-rentable"
          className="block px-4 py-2 hover:bg-gray-100 rounded-2xl whitespace-nowrap"
        >
          Anuncie seus itens
        </a>
        <a
          href="/account"
          className="block px-4 py-2 hover:bg-gray-100 rounded-2xl whitespace-nowrap"
        >
          Meu cadastro
        </a>
        <a
          href="/account-rentable"
          className="block px-4 py-2 hover:bg-gray-100 rounded-2xl whitespace-nowrap"
        >
          Meu anúncios
        </a>
        <hr className="my-2" />
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-2xl whitespace-nowrap"
        >
          Central de Ajuda
        </button>
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded-2xl whitespace-nowrap"
        >
          Sair
        </button>
      </Popover.Panel>
    </Popover>
  );
};

export default function Account() {
  const [auth] = useLocalStorage<AuthenticationPostDefaultResponse | null>(
    "auth",
    null,
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) return null;

  return (
    <div className="AvatarDropdown ">
      <div className="flex gap-4">
        <ButtonPrimary
          className="hidden md:block"
          href={`${!auth ? "/login" : "/account-rentable"}`}
        >
          {!auth ? "Anunciar Grátis" : "Anunciar"}
        </ButtonPrimary>
        <Login />
      </div>
    </div>
  );
}
