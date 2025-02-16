"use client";

import { useEffect, useState } from "react";
import Link, { LinkProps } from "next/link";
import { UrlObject } from "url";

interface UTMLinkProps<RouteInferType = unknown>
  extends LinkProps<RouteInferType> {
  children: React.ReactNode;
}

const utmParamsList = ["utm_source", "utm_medium", "utm_campaign"];

const getUTMParams = (): Record<string, string> => {
  const params: Record<string, string> = {};

  if (typeof window !== "undefined") {
    // Ensure this runs on client
    utmParamsList.forEach((param) => {
      const value = localStorage.getItem(param);
      if (value) {
        params[param] = value;
      }
    });
  }

  return params;
};

const appendUTMParams = (
  href: UrlObject,
  utmParams: Record<string, string>,
): UrlObject => {
  if (typeof window === "undefined") return href; // Prevent running on server

  const url = new URL(href.pathname || "", window.location.origin);

  Object.entries(utmParams).forEach(([key, value]) => {
    if (!url.searchParams.has(key)) {
      url.searchParams.append(key, value);
    }
  });

  return {
    pathname: url.pathname,
    search: url.search,
    hash: url.hash,
  };
};

const UTMLink = <RouteInferType,>({
  href,
  children,
  ...props
}: UTMLinkProps<RouteInferType>) => {
  const [updatedHref, setUpdatedHref] = useState<UrlObject>(
    typeof href === "string" ? { pathname: href } : href,
  );

  useEffect(() => {
    const utmParams = getUTMParams();
    if (typeof href === "string") {
      setUpdatedHref(appendUTMParams({ pathname: href }, utmParams));
    } else {
      setUpdatedHref(appendUTMParams(href, utmParams));
    }
  }, [href]);

  return (
    <Link href={updatedHref} {...props}>
      {children}
    </Link>
  );
};

export default UTMLink;
