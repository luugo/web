"use client";
import React, { useState } from "react";
import Input from "@/shared/Input/Input";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import { useRouter } from "next/navigation";
import { AuthenticationApi, ResponseError } from "@api";
import { Alert } from "@/shared/Alert/Alert";
import UTMLink from "@/components/UTMLink";

const fromToError = (message: string) => {
  let msg = message;
  switch (message) {
    case "weak_password":
      msg =
        "Por favor, escolha uma senha mais forte. Uma senha forte deve conter uma combinação de letras maiúsculas e minúsculas, números e caracteres especiais.";
      break;
    default:
      break;
  }
  return msg;
};

const PageSignUp = () => {
  const [alert, setAlert] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (password != confirmPassword) {
        return showError(
          "As senhas não coincidem. Por favor, tente novamente.",
        );
      }
      const authenticationApi = new AuthenticationApi();
      const requestParameters = {
        authenticationEmailPostRequest: {
          email,
          password,
          confirmPassword: password,
        },
      };

      await authenticationApi.authenticationEmailPost(requestParameters);

      router.push("/sign-up-confirm-code");
    } catch (e: unknown) {
      if (e instanceof ResponseError) {
        const response = await e.response.json();
        showError(e.message, true);
        console.error("Erro durante a solicitação:", response);
      }
    }
  };

  const showError = (msg: string, fromTo: boolean = false) => {
    if (fromTo) msg = fromToError(msg);
    setAlert(msg);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  };

  return (
    <div className={`nc-PageSignUp `} data-nc-id="PageSignUp">
      <div className="absolute top-0 z-max w-full p-4">
        {showAlert && (
          <Alert type="error" onClick={() => setShowAlert(false)}>
            {alert}
          </Alert>
        )}
      </div>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Inscrever-se
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
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
                value={email}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Senha
              </span>
              <Input
                type="password"
                className="mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirmar senha
              </span>
              <Input
                type="password"
                className="mt-1"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
            <ButtonPrimary type="submit">Continuar</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Já tem uma conta? {` `}
            <UTMLink className="text-green-600" href="/login">
              Entrar
            </UTMLink>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
