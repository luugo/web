import React, { useEffect, useState } from "react";
import {
  faFacebook,
  faInstagram,
  faWhatsapp,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserContact } from "@api";

const RentableUserContacts = (data: { [key: string]: UserContact }) => {
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

  const renderSocialIcon = (
    network: IconDefinition,
    value: string,
    url: string,
  ) => (
    <div key={`${network}-${url}`}>
      <FontAwesomeIcon icon={network} size={"lg"} />
      <span className="ml-2"></span>
      <a href={url} key={url} target={"_blank"}>
        {value}
      </a>
    </div>
  );

  return (
    <div className="w-full rounded-2xl space-y-2.5">
      <ul>
        {dataArray.map((item) => {
          switch (item.type) {
            case "INSTAGRAM":
              return (
                <li key={item.id} className={"mb-1"}>
                  {isClient &&
                    renderSocialIcon(
                      faInstagram,
                      `@${item.value}`,
                      `https://instagram.com/${item.value}`,
                    )}
                </li>
              );
            case "FACEBOOK":
              return (
                <li key={item.id} className={"mb-1"}>
                  {isClient &&
                    renderSocialIcon(
                      faFacebook,
                      item.value,
                      `https://fb.me/${item.value}`,
                    )}
                </li>
              );
            case "EMAIL":
              return (
                <li key={item.id} className={"mb-1"}>
                  {isClient &&
                    renderSocialIcon(
                      faEnvelope,
                      item.value,
                      `mailto:${item.value}`,
                    )}
                </li>
              );
            case "PHONE":
              return (
                <li key={item.id} className={"mb-1"}>
                  {isClient &&
                    renderSocialIcon(faPhone, item.value, `tel:${item.value}`)}
                </li>
              );
            case "WHATSAPP":
              return (
                <li key={item.id} className={"mb-1"}>
                  {isClient &&
                    renderSocialIcon(
                      faWhatsapp,
                      item.value,
                      `https://wa.me/${item.value.replace(/\D/g, "")}`,
                    )}
                </li>
              );
            default:
              return (
                <li key={item.id} className={"mb-1"}>
                  <p>{item.value}</p>
                </li>
              );
          }
        })}
      </ul>
    </div>
  );
};

export default RentableUserContacts;
