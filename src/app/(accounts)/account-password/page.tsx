"use client"
import Label from "@/components/Label/Label";
import React, {useState} from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";
import { Alert } from "@/shared/Alert/Alert";
import {AuthenticationApi, AuthenticationPostDefaultResponse} from "../../../../luugoapi";
import {AlertOptions} from "@/interfaces";
import {useRouter} from "next/navigation";

const AccountPass = () => {
  const router = useRouter();
  const [alert, setAlert] = useState('');
  const [typeAlert, setTypeAlert] = useState<keyof AlertOptions>('success');
  const [isShowAlert, setShowAlert] = useState<boolean>(false);
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const authApi = new AuthenticationApi();

  let storageData: any = null;
  if (typeof window !== 'undefined') {
    storageData = localStorage.getItem('luugo');
  }

  const showAlert = (msg: string, type: keyof AlertOptions = 'success') => {
    setAlert(msg);
    setTypeAlert(type);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000);
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (storageData !== null) {
      JSON.parse(storageData);
      const requestParameters: any = {
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      };

      try {
        const luugo: AuthenticationPostDefaultResponse = JSON.parse(storageData);

        await authApi?.authenticationPut(
          {authenticationPutRequest: requestParameters},
          {
            headers: {
              Authorization: `Bearer ${luugo?.token}`,
              "Content-Type": "application/json",
            },
          }
        );

        showAlert('Senha alterada com sucesso!');

      } catch (error: any) {
        const errorData = await error.response?.json();
        if (errorData) {
          const message = errorData[0]?.message
          if (message == null) {
            setErrorMessage("Erro inesperado. Por favor, tente novamente.");
          } else {
            setErrorMessage(message);
          }
        }
      }
    }
  };

  return (
    <div className="space-y-10 sm:space-y-12">
      <div className="fixed left-0 top-0 z-max w-full p-4">
        {isShowAlert && (<Alert type={typeAlert} onClick={() => setShowAlert(false)}>{alert}</Alert>)}
      </div>
      {/* HEADING */}
      <form onSubmit={handleUpdatePassword} className="w-full max-w-md space-y-4">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Atualize sua Senha
        </h2>
        <div className=" max-w-xl space-y-6">
          <div>
            <Label>Senha Atual</Label>
            <Input
              type="password"
              className="mt-1.5"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e?.target?.value)}
            />
          </div>
          <div>
            <Label>Nova Senha</Label>
            <Input
              type="password"
              className="mt-1.5"
              value={newPassword}
              onChange={(e) => setNewPassword(e?.target?.value)}
            />
          </div>
          <div>
            <Label>Confirmar Senha</Label>
            <Input
              type="password"
              className="mt-1.5"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e?.target?.value)}
            />
            {errorMessage && (
              <p className="text-red-500 font-semibold">{errorMessage}</p>
            )}
          </div>
          <div className="pt-2">
            <ButtonPrimary type={"submit"}>Atualizar Senha</ButtonPrimary>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountPass;
