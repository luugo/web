import Button, { ButtonProps } from "@/shared/Button/Button";
import React from "react";

export type ButtonSecondaryProps = ButtonProps;

const ButtonSecondary: React.FC<ButtonSecondaryProps> = ({
  className = " border border-slate-300 text-slate-700 dark:border-slate-700 ",
  ...args
}) => {
  return (
    <Button
      className={`ttnc-ButtonSecondary bg-white dark:bg-slate-900 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 ${className}`}
      {...args}
    />
  );
};

export default ButtonSecondary;
