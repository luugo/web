import React, { FC } from "react";
import { BILLINGFREQUENCY } from "@/data/billingFrequency";

export interface PricesProps {
  className?: string;
  price?: number;
  billingFrequency?: string;
  contentClass?: string;
}

const Prices: FC<PricesProps> = ({
  className = "",
  price = 33,
  billingFrequency = "",
  contentClass = "py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium",
}) => {
  const intlMonetary = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });
  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center border-2 border-green-500 rounded-lg ${contentClass}`}
      >
        <span className="text-green-500 !leading-none">
          {String(intlMonetary.format(price))}/
          {BILLINGFREQUENCY[billingFrequency]}
        </span>
      </div>
    </div>
  );
};

export default Prices;
