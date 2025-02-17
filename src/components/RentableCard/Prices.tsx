import React, { FC } from "react";
import { BILLINGFREQUENCY } from "@/data/billingFrequency";
import { RentableBillingFrequencyEnum } from "@api";

export interface PricesProps {
  priceClass?: string;
  price?: number;
  billingFrequency?: string;
  frequencyClass?: string;
}

const Prices: FC<PricesProps> = ({
  price = 33,
  priceClass = "",
  billingFrequency = "",
  frequencyClass = "text-sm font-medium",
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
    <div className={`inline-flex items-center`}>
      {billingFrequency === RentableBillingFrequencyEnum.Negotiable ? (
        "Negociável"
      ) : (
        <>
          <span className={`font-semibold leading-none ${priceClass}`}>
            {priceText}
          </span>
          <span
            className={`ml-[1px] font-normal leading-none ${frequencyClass}`}
          >
            /{BILLINGFREQUENCY[billingFrequency]}
          </span>
        </>
      )}
    </div>
  );
};

export default Prices;
