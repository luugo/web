import Label from "@/components/Label/Label";
import React from "react";
import ButtonPrimary from "@/shared/Button/ButtonPrimary";
import Input from "@/shared/Input/Input";

const AccountPass = () => {
  return (
    <div className="space-y-10 sm:space-y-12">
      {/* HEADING */}
      <h2 className="text-2xl sm:text-3xl font-semibold">
        Atualize sua Senha
      </h2>
      <div className=" max-w-xl space-y-6">
        <div>
          <Label>Senha Atual</Label>
          <Input type="password" className="mt-1.5" />
        </div>
        <div>
          <Label>Nova Senha</Label>
          <Input type="password" className="mt-1.5" />
        </div>
        <div>
          <Label>Confirmar Senha</Label>
          <Input type="password" className="mt-1.5" />
        </div>
        <div className="pt-2">
          <ButtonPrimary>Atualizar Senha</ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default AccountPass;
