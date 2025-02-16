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
  price = 33,
  billingFrequency = "",
  contentClass = "text-sm font-medium",
}) => {
  const intlMonetary = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  });

  const priceText =
    billingFrequency === RentableBillingFrequencyEnum.Negotiable
      ? "Negociável"
      : `${String(intlMonetary.format(price))}`;

  return (
    <div className={`inline-flex text-slate-900 items-center ${contentClass}`}>
      {billingFrequency === RentableBillingFrequencyEnum.Negotiable ? (
        "Negociável"
      ) : (
        <>
          <span className="font-semibold leading-none">{priceText}</span>
          <span className="ml-[1px] font-normal leading-none">
            {BILLINGFREQUENCY[billingFrequency]}
          </span>
        </>
      )}
    </div>
  );
};

export default Prices;
