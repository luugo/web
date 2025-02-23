"use client";
import React, { useState } from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { useRouter } from "next/navigation";
import {
  AuthenticationApi,
  AuthenticationPostDefaultResponse,
  ResponseError,
} from "@api";
import Label from "@/components/Label/Label";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import useLocalStorage from "@/hooks/useLocalStorage";
import UTMLink from "@/components/UTMLink";

const PageLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [, setAuth] = useLocalStorage<AuthenticationPostDefaultResponse | null>(
    "auth",
    null,
  );

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const authenticationApi = new AuthenticationApi();
      const requestParameters = {
        authenticationPostRequest: {
          username,
          password,
        },
      };

      const result =
        await authenticationApi.authenticationPost(requestParameters);
      await handleLoginResult(result, router);
    } catch (error: unknown) {
      if (error instanceof ResponseError) {
        const errorData = await error.response.json();
        const errorMessage = errorData[0]?.message;

        if (errorMessage === "O usuário ainda não foi verificado") {
          router.push("/sign-up-confirm-code");
        }
        setLoginError(errorMessage);
      }
    }
  };

  const handleLoginResult = async (
    result: AuthenticationPostDefaultResponse,
    router: AppRouterInstance,
  ) => {
    if (result.token) {
      setAuth(result);

      router.push("/");
    } else if (result.authenticationId) {
      localStorage.setItem(
        "auth",
        JSON.stringify({ user: { authenticationId: result.authenticationId } }),
      );
      router.push("/complete-signup");
    }
  };

  const handleSuccess = async (response: CredentialResponse) => {
    const authenticationApi = new AuthenticationApi();
    const requestParameters = {
      authenticationGooglePostRequest: {
        token: response.credential!,
      },
    };

    const result: AuthenticationPostDefaultResponse =
      await authenticationApi.authenticationGooglePost(requestParameters);

    await handleLoginResult(result, router);
  };

  const handleError = () => {
    console.error("Login Failed");
  };

  return (
    <div className={`nc-PageLogin`} data-nc-id="PageLogin">
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Conecte-se
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <form
            className="grid grid-cols-1 gap-6"
            onSubmit={(e) => handleSubmit(e)}
          >
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
                <UTMLink href="/forgot-pass" className="text-sm text-green-600">
                  Esqueceu sua senha?
                </UTMLink>
              </span>
              <Input
                type="password"
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            {loginError && (
              <Label className="block text-red-500 text-sm font-bold mb-2">
                {loginError}
              </Label>
            )}
            <ButtonPrimary type="submit">Continuar</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Novo usuário: {` `}
            <UTMLink className="text-green-600" href="/signup">
              Crie a sua conta aqui
            </UTMLink>
            <div>
              <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
