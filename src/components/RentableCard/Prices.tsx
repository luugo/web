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
  price = 0,
  priceClass = "text-lg text-teal-500",
  billingFrequency = "",
  frequencyClass = "text-xs text-slate-400",
}) => {
  const integerPart: number = Math.trunc(price);
  const fractionPart = Math.trunc((price - integerPart) * 100);

  const intlMonetary = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
  });

  const priceText =
    billingFrequency === RentableBillingFrequencyEnum.Negotiable ? (
      "Negociável"
    ) : (
      <>
        <span className={`font-semibold ${priceClass}`}>
          {intlMonetary.format(integerPart)}
        </span>
        <span className={`${frequencyClass}`}>
          {fractionPart.toString().padStart(2, "0")}
        </span>
      </>
    );

  return (
    <div className={`inline-flex flex-start`}>
      {billingFrequency === RentableBillingFrequencyEnum.Negotiable ? (
        "Negociável"
      ) : (
        <>
          {priceText}
          <span className={`ml-[1px] font-normal ${frequencyClass}`}>
            /{BILLINGFREQUENCY[billingFrequency]}
          </span>
        </>
      )}
    </div>
  );
};

export default Prices;
