"use client";
import React, {useState} from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Link from "next/link";
import {AuthenticationApi, AuthenticationResetPasswordPostRequest} from "@api";
import {AlertOptions} from "@/interfaces";
import {Alert} from "@/shared/Alert/Alert";
import {useRouter} from "next/navigation";

const PageForgotPass = ({}) => {
  const router = useRouter();
  const [alert, setAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState<keyof AlertOptions>('success');
  const [isShowAlert, setShowAlert] = useState<boolean>(false);
  const [email, setUsername] = useState('');

  const showAlert = (msg: string, type: keyof AlertOptions = 'success') => {
    setAlert(msg);
    setTypeAlert(type);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 7000);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const authenticationApi = new AuthenticationApi();
    const requestApiParameters: AuthenticationResetPasswordPostRequest = {
      username: email,
    };

    try {
      await authenticationApi.authenticationResetPasswordPost({
        authenticationResetPasswordPostRequest: requestApiParameters,
      });

      router.push("/reset-password");

    } catch (error: any) {
      const errorData = await error.response.json();
      const message = errorData[0]?.message
      if (message == null) {
        showAlert("Erro inesperado. Por favor, tente novamente.");
      } else {
        showAlert(message, 'error');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setUsername(value);
  };

  return (
    <div className="container mb-24 lg:mb-32">
      <div className="fixed left-0 top-0 z-max w-full p-4">
        {isShowAlert && (
          <Alert
            type={typeAlert}
            onClick={() => setShowAlert(false)}
          >
            {alert}
          </Alert>
        )}
      </div>
      <header className="text-center max-w-2xl mx-auto - mb-14 sm:mb-16 lg:mb-20">
        <h2
          className="mt-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center"
        >
          Esqueci a senha
        </h2>
        <span className="block text-sm mt-4 text-neutral-700 sm:text-base dark:text-neutral-200">
        Bem-vindo à nossa Comunidade
      </span>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <label className="block">
          <span className="text-neutral-800 dark:text-neutral-200">
            Endereço de e-mail
          </span>
            <Input
              type="email"
              id="email"
              onChange={handleChange}
              placeholder="exemplo@exemplo.com"
              className="mt-1"
              value={email}
            />
          </label>
          <ButtonPrimary type="submit">Continuar</ButtonPrimary>
        </form>

        {/* ==== */}
        <span className="block text-center text-neutral-700 dark:text-neutral-300">
        Voltar para {` `}
          <Link href="/login" className="text-green-600">
          Entrar
        </Link>
          {` / `}
          <Link href="/signup" className="text-green-600">
          Cadastrar
        </Link>
      </span>
      </div>
    </div>
  );
};

export default PageForgotPass;
