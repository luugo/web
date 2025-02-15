"use client";

import Avatar from "@/shared/Avatar/Avatar";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import ButtonSecondary from "@/shared/Button/ButtonSecondary";
import { useEffect } from "react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AuthenticationPostDefaultResponse } from "@api";

const IsLoggedIn = () => {
  const [auth] = useLocalStorage<AuthenticationPostDefaultResponse | null>(
    "auth",
    null
  );

  if (!auth) return null;

  const fullName = [auth.user?.firstName || "Nome", auth.user?.lastName || ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex items-center space-x-3">
      <Avatar
        imgUrl={auth.user?.thumbnail || "/avatar.jpg"}
        sizeClass="w-8 h-8"
      />
      <div className="flex-grow">
        <h4 className="font-semibold">{fullName}</h4>
      </div>
    </div>
  );
};

export default function Account() {
  const [auth] = useLocalStorage<AuthenticationPostDefaultResponse | null>(
    "auth",
    null
  );

  useEffect(() => {}, [auth]);

  return (
    <div className="AvatarDropdown ">
      <div className="flex gap-4">
        <ButtonSecondary
          sizeClass={
            auth
              ? "py-2 px-2 pr-4 sm:py-2 sm:px-2 sm:pr-4"
              : "py-2 px-4 sm:py-2 sm:px-6"
          }
          href={auth ? "/account" : "/login"}
        >
          {auth ? <IsLoggedIn /> : "Entrar"}
        </ButtonSecondary>
        <ButtonPrimary href="/login">Anunciar Grátis</ButtonPrimary>
      </div>
    </div>
  );
}
