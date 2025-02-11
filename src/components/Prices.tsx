import React, { FC } from "react";
import { BILLINGFREQUENCY } from "@/data/billingFrequency";
import { RentableBillingFrequencyEnum } from "@api";

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

  const priceText =
    billingFrequency === RentableBillingFrequencyEnum.Negotiable
      ? "Negociável"
      : `${String(intlMonetary.format(price))}/${BILLINGFREQUENCY[billingFrequency]}`;

  return (
    <div className={`${className}`}>
      <div
        className={`flex items-center border-2 border-teal-500 rounded-lg ${contentClass}`}
      >
        <span className="text-teal-500 !leading-none">{priceText}</span>
      </div>
    </div>
  );
};

export default Prices;
