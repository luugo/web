"use client";

import React, { FC, useState } from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { useRouter } from "next/navigation";
import {
  AuthenticationApi,
  AuthenticationEmailPutRequest,
  AuthenticationPostDefaultResponse,
  ResponseError,
} from "@api";
import { useLocalStorage } from "react-use";
import UTMLink from "@/components/UTMLink";

const SignUpVerifyInputPage: FC = () => {
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const [, setAuth] = useLocalStorage<AuthenticationPostDefaultResponse | null>(
    "auth",
    null,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (code.length !== 6) {
      setErrorMessage("Por favor, insira um código de 6 dígitos.");
      return;
    }

    const authenticationApi = new AuthenticationApi();
    const requestApiParameters: AuthenticationEmailPutRequest = {
      emailVerificationKey: code,
    };

    try {
      const result = await authenticationApi.authenticationEmailPut({
        authenticationEmailPutRequest: requestApiParameters,
      });

      if (result) {
        setAuth({ authenticationId: result });
        router.push("/complete-signup");
      }
    } catch (error: unknown) {
      if (error instanceof ResponseError) {
        const errorData = await error.response.json();
        const message = errorData[0]?.message;
        if (message == null) {
          setErrorMessage("Erro inesperado. Por favor, tente novamente.");
        } else {
          setErrorMessage(message);
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 6) {
      setCode(value);
      setErrorMessage(null);
    }
  };

  return (
    <div className="container mb-24 lg:mb-32">
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <h2 className="mt-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Verificação de Cadastro
        </h2>
        <span className="block text-sm mt-4 text-neutral-700 sm:text-base dark:text-neutral-200">
          Bem-vindo à nossa Comunidade
        </span>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <label htmlFor="code" className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Insira o código de 6 dígitos que enviamos para o seu email.
            </span>
            <Input
              type="text"
              id="code"
              value={code}
              onChange={handleChange}
              maxLength={6}
              placeholder="000000"
              className="mt-1 text-center text-xl tracking-widest"
            />
          </label>
          <ButtonPrimary type="submit">Confirmar</ButtonPrimary>
          {errorMessage && (
            <p className="block text-red-500 text-sm font-bold mt-2">
              {errorMessage}
            </p>
          )}
        </form>

        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          Não recebeu o código?{` `}
          <UTMLink href="/signup" className="text-green-600">
            Reenviar código
          </UTMLink>
        </span>
      </div>
    </div>
  );
};

export default SignUpVerifyInputPage;
