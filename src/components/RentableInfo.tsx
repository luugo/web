import Link from "next/link";
import React, { useState, useEffect } from "react";

type UserContact = {
  id: string;
  type: "INSTAGRAM" | "FACEBOOK" | "EMAIL" | "PHONE" | "WHATSAPP";
  value: string;
};
import { SocialIcon } from "react-social-icons";

const RentableInfo = (data: { [key: string]: UserContact }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  if (!data || typeof data !== "object") {
    console.error("Data is not an object:", data);
    return <p>Erro: Dados inválidos.</p>;
  }

  const dataArray = Object.values(data);

  const renderSocialIcon = (network: string, value: string, url: any) => (
    <div key={`${network}-${url}`} style={{ fontSize: 20 }}>
      <SocialIcon network={network} url={url} style={{ marginRight: 10 }} />
      <Link href={url} key={url}>
        {value}
      </Link>
    </div>
  );

  return (
    <div className="w-full rounded-2xl space-y-2.5">
      <ul>
        {dataArray.map((item) => {
          switch (item.type) {
            case "INSTAGRAM":
              return (
                <li key={item.id}>
                  {isClient &&
                    renderSocialIcon(
                      "instagram",
                      `@${item.value}`,
                      `https://instagram.com/${item.value}`
                    )}
                </li>
              );
            case "FACEBOOK":
              return (
                <li key={item.id}>
                  {isClient &&
                    renderSocialIcon(
                      "facebook",
                      item.value,
                      `https://fb.me/${item.value}`
                    )}
                </li>
              );
            case "EMAIL":
              return (
                <li key={item.id}>
                  {isClient &&
                    renderSocialIcon(
                      "email",
                      item.value,
                      `mailto:${item.value}`
                    )}
                </li>
              );
            case "PHONE":
              return (
                <li key={item.id}>
                  {isClient &&
                    renderSocialIcon(
                      "whatsapp",
                      item.value,
                      `tel:${item.value}`
                    )}
                </li>
              );
            case "WHATSAPP":
              return (
                <li key={item.id}>
                  {isClient &&
                    renderSocialIcon(
                      "whatsapp",
                      item.value,
                      `https://wa.me/${item.value.replace(/\D/g, "")}`
                    )}
                </li>
              );
            default:
              return (
                <li key={item.id}>
                  <p>{item.value}</p>
                </li>
              );
          }
        })}
      </ul>
    </div>
  );
};

export default RentableInfo;
