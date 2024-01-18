import React from "react";
import ButtonClose from "@/shared/ButtonClose/ButtonClose";

export interface AlertProps {
  containerClassName?: string;
  type?: "default" | "warning" | "info" | "success" | "error";
  children?: React.ReactNode;
  onClick: () => void;
}

export const Alert: React.FC<AlertProps> = ({
  children = "Alert Text",
  containerClassName = "",
  type = "default",
  onClick,
}) => {
  let classes = containerClassName;
  let color = '';
  switch (type) {
    case "default":
      classes += ` bg-neutral-100 border-neutral-400`;
      color = 'text-neutral-700';
      break;
    case "info":
      classes += ` bg-blue-100 border-blue-400`;
      color = 'text-blue-700';
      break;
    case "success":
      classes += ` bg-green-100 border-green-400`;
      color = 'text-green-700';
      break;
    case "error":
      classes += ` bg-red-100 border-red-400`;
      color = 'text-red-700';
      break;
    case "warning":
        classes += ` bg-orange-100 border-orange-400`;
        color = 'text-orange-700';
      break;
    default:
      break;
  }

  return (
    <div
      className={`ttnc-alert border relative flex items-center text-paragraph-base px-4 py-3 rounded-lg ${classes} ${color}`}
    >
      <span className="block sm:inline pr-7">
      {children}
      </span>
      <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
        <svg  onClick={() => onClick()} className={`fill-current h-6 w-6 ${color}`} role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
      </span>
    </div>
  );
};
