import Button, { ButtonProps } from "@/shared/Button/Button";
import React from "react";

export type ButtonPrimaryProps = ButtonProps;

const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({
  className = "",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonPrimary disabled:bg-opacity-90 bg-teal-400 hover:bg-teal-500 text-slate-900 ${className}`}
      {...args}
    />
  );
};

export default ButtonPrimary;
