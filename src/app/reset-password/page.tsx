"use client";
import React, { useState } from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import {
  AuthenticationApi,
  AuthenticationResetPasswordPutRequest,
  ResponseError,
} from "@api";
import { AlertOptions } from "@/interfaces";
import { Alert } from "@/shared/Alert/Alert";
import { useRouter } from "next/navigation";
import UTMLink from "@/components/UTMLink";

const PageResetPassword = () => {
  const router = useRouter();
  const [alert, setAlert] = useState("");
  const [typeAlert, setTypeAlert] = useState<keyof AlertOptions>("success");
  const [isShowAlert, setShowAlert] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    username: "",
    passwordRecoveryKey: "",
    password: "",
    confirmPassword: "",
  });

  const showAlert = (msg: string, type: keyof AlertOptions = "success") => {
    setAlert(msg);
    setTypeAlert(type);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 6000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { username, passwordRecoveryKey, password, confirmPassword } =
      formData;

    if (password !== confirmPassword) {
      showAlert("As senhas não coincidem.", "error");
      return;
    }

    const authenticationApi = new AuthenticationApi();
    const requestApiParameters: AuthenticationResetPasswordPutRequest = {
      username,
      passwordRecoveryKey,
      password,
      confirmPassword,
    };

    try {
      await authenticationApi.authenticationResetPasswordPut({
        authenticationResetPasswordPutRequest: requestApiParameters,
      });

      showAlert("Senha redefinida com sucesso!", "success");

      setTimeout(() => {
        router.push("/login");
      }, 5000);
    } catch (error: unknown) {
      if (error instanceof ResponseError) {
        const errorData = await error.response.json();
        const message = errorData[0]?.message;
        if (message == null) {
          showAlert("Erro inesperado. Por favor, tente novamente.", "error");
        } else {
          showAlert(message, "error");
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className="container mb-24 lg:mb-32">
      <div className="fixed left-0 top-0 z-max w-full p-4">
        {isShowAlert && (
          <Alert type={typeAlert} onClick={() => setShowAlert(false)}>
            {alert}
          </Alert>
        )}
      </div>
      <header className="text-center max-w-2xl mx-auto mb-14 sm:mb-16 lg:mb-20">
        <h2 className="mt-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Redefinir senha
        </h2>
        <span className="block text-sm mt-4 text-neutral-700 sm:text-base dark:text-neutral-200">
          Digite as informações abaixo para redefinir sua senha.
        </span>
      </header>

      <div className="max-w-md mx-auto space-y-6">
        {/* FORM */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Nome de usuário ou e-mail
            </span>
            <Input
              type="text"
              id="username"
              onChange={handleChange}
              placeholder="exemplo@exemplo.com"
              className="mt-1"
              value={formData.username}
            />
          </label>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Código de recuperação
            </span>
            <Input
              type="text"
              id="passwordRecoveryKey"
              onChange={handleChange}
              placeholder="Insira o código recebido"
              className="mt-1"
              value={formData.passwordRecoveryKey}
            />
          </label>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Nova senha
            </span>
            <Input
              type="password"
              id="password"
              onChange={handleChange}
              placeholder="Digite a nova senha"
              className="mt-1"
              value={formData.password}
            />
          </label>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Confirmar nova senha
            </span>
            <Input
              type="password"
              id="confirmPassword"
              onChange={handleChange}
              placeholder="Confirme a nova senha"
              className="mt-1"
              value={formData.confirmPassword}
            />
          </label>
          <ButtonPrimary type="submit">Redefinir senha</ButtonPrimary>
        </form>

        {/* ==== */}
        <span className="block text-center text-neutral-700 dark:text-neutral-300">
          Voltar para {` `}
          <UTMLink href="/login" className="text-green-600">
            Entrar
          </UTMLink>
          {` / `}
          <UTMLink href="/signup" className="text-green-600">
            Cadastrar
          </UTMLink>
        </span>
      </div>
    </div>
  );
};

export default PageResetPassword;
