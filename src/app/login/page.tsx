"use client"
import React, { useState } from "react";
import facebookSvg from "@/images/Facebook.svg";
import twitterSvg from "@/images/Twitter.svg";
import googleSvg from "@/images/Google.svg";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthenticationApi, UserApi, UserContactApi, UserTypeEnum } from "../../../luugoapi";
import { useUserContext } from "@/context";
import Label from "@/components/Label/Label";

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "#",
    icon: facebookSvg,
  },
  {
    name: "Continue with Twitter",
    href: "#",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const renderOR = () => {
  if(!loginSocials.length) {
    return (
      <div className="relative text-center">
        <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
          OR
        </span>
        <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
      </div>
    )
  }
}

const PageLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const authenticationApi = new AuthenticationApi();
      const requestParameters = {
        authenticationPostRequest: {
          username,
          password,
        }
      }

      const result = await authenticationApi.authenticationPost(requestParameters)

      if(result.token) {
        localStorage.setItem('luugo', JSON.stringify(result));
  
        const userContactApi = new UserContactApi();
        const user = result.user;
        const userId = user?.id;

        if(userId) {
          const contacts = await userContactApi.userContactGet({userId})
          localStorage.setItem('luugo', JSON.stringify({...result, contacts}));
        }
        router.push("/");
      } else if(result.authenticationId) {
        localStorage.setItem('luugo', JSON.stringify({user: {authenticationId: result.authenticationId}}));
        router.push("/complete-signup");
      }
    } catch (error: any) {
      const errorData = await error.response.json();
      const errorMessage = errorData[0]?.message

      if( errorMessage === "O usuário ainda não foi verificado"){
        router.push("/sign-up-confirm-code");
      }
      setLoginError(errorMessage);
    }
  };
  
  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Conecte-se
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {!loginSocials?.length && loginSocials?.map((item, index) => (
              <a
                key={index}
                href={item?.href}
                className="flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <Image
                  className="flex-shrink-0"
                  src={item?.icon}
                  alt={item?.name}
                  sizes="40px"
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item?.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          {renderOR()}
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6"
           onSubmit={(e) => handleSubmit(e)}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                E-mail
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Senha
                <Link href="/forgot-pass" className="text-sm text-green-600">
                  Esqueceu sua senha?
                </Link>
              </span>
              <Input type="password" className="mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)} />
            </label>
            {loginError && <Label className="block text-red-500 text-sm font-bold mb-2">{loginError}</Label>}
            <ButtonPrimary type="submit">Continuar</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Novo usuãrio: {` `}
            <Link className="text-green-600" href="/signup">
              Crie a sua conta aqui
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
