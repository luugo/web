"use client";

import Avatar from "@/shared/Avatar/Avatar";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AuthenticationPostDefaultResponse } from "@api";
import { Popover } from "@headlessui/react";
import { useEffect, useState } from "react";

const Login = () => {
  const [auth, setAuth] =
    useLocalStorage<AuthenticationPostDefaultResponse | null>("auth", null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

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
        <ButtonSecondary sizeClass="py-2 px-2 pr-4 sm:py-2 sm:px-2 sm:pr-4">
          <div className="flex items-center space-x-3">
            <Avatar
              imgUrl={auth.user?.thumbnail || "/avatar.jpg"}
              sizeClass="w-6 h-6"
            />
            <div className="flex-grow">
              <h4 className="font-semibold">{fullName}</h4>
            </div>
          </div>
        </ButtonSecondary>
      </Popover.Button>

      <Popover.Panel className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-md p-2">
        <a
          href="/account"
          className="block px-4 py-2 hover:bg-gray-100 rounded"
        >
          Meu cadastro
        </a>
        <a
          href="/account-rentable"
          className="block px-4 py-2 hover:bg-gray-100 rounded"
        >
          Meu anúncios
        </a>
        <hr className="my-2" />
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-100 rounded"
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
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <div className="AvatarDropdown ">
      <div className="flex gap-4">
        <Login />
        {!auth ? (
          <ButtonPrimary href="/login">Anunciar Grátis</ButtonPrimary>
        ) : null}
      </div>
    </div>
  );
}
