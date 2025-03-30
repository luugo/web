import React, { useEffect, useState } from "react";
import { faWhatsapp, IconDefinition } from "@fortawesome/free-brands-svg-icons";
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
          const message = encodeURI(
            "Olá! Estou interessado(a) no seu anuncio que encontrei no aplicativo LuuGo. Podemos conversar sobre disponibilidade e detalhes?",
          );
          switch (item.type) {
            case "WHATSAPP":
              return (
                <li key={item.id} className={"mb-1 bg-blue-950 hover:cursor-pointer hover:bg-blue-900 text-white text-center font-bold py-2 px-4 rounded"}>
                  {isClient &&
                    renderSocialIcon(
                      faWhatsapp,
                      'Entrar em contato',
                      `https://wa.me/${item.value.replace(/\D/g, "")}?text=${message}`,
                    )}
                </li>
              );
            default:
              return;
          }
        })}
      </ul>
    </div>
  );
};

export default RentableUserContacts;
