"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

const utmParamsList = ["utm_source", "utm_medium", "utm_campaign"];

const saveUTMParamsToLocalStorage = (searchParams: URLSearchParams) => {
  utmParamsList.forEach((param) => {
    const value = searchParams.get(param);
    if (value) {
      localStorage.setItem(param, value);
    }
  });
};

const UTMTracker = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    saveUTMParamsToLocalStorage(searchParams);
  }, [pathname, searchParams]);

  return null;
};

export default UTMTracker;
