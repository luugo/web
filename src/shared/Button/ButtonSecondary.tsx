import Button, { ButtonProps } from "@/shared/Button/Button";
import React from "react";

export type ButtonSecondaryProps = ButtonProps;

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = "border border-slate-300 text-slate-900",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary bg-white hover:bg-gray-100 ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
