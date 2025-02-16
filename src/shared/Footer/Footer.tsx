import Logo from "@/shared/Logo/Logo";
import SocialsList1 from "@/shared/SocialsList1/SocialsList1";
import { CustomLink } from "@/data/types";
import React from "react";
import UTMLink from "@/components/UTMLink";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "LuuGo",
    menus: [
      { href: "/about", label: "Sobre" },
      { href: "/signup", label: "Cadastre-se" },
      // { href: "#", label: "FAQs" },
    ],
  },
  {
    id: "2",
    title: "Categorias",
    menus: [
      {
        href: {
          pathname: "/category/item",
        },
        label: "Itens",
      },
      {
        href: {
          pathname: "/category/service",
        },
        label: "Serviços",
      },
      {
        href: {
          pathname: "/category/place",
        },
        label: "Lugares",
      },
      {
        href: {
          pathname: "/category/auto",
        },
        label: "Veículos",
      },
    ],
  },
  {
    id: "3",
    title: "Companhia",
    menus: [
      { href: "/contact", label: "Contato" },
      { href: "/privacy-policy", label: "Política de privacidade" },
      { href: "/terms", label: "Termos de Uso" },
      { href: "/child-safety", label: "Segurança Infantil" },
    ],
  },
];

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <UTMLink
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
                rel="noopener noreferrer"
              >
                {item.label}
              </UTMLink>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="nc-Footer relative py-20 lg:pt-28 lg:pb-24 border-t border-neutral-200 dark:border-neutral-700">
      <div className="container grid grid-cols-1 gap-y-10 gap-x-5 sm:gap-x-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-10 ">
        <div className="grid grid-cols-3 gap-4 lg:md:col-span-1 lg:flex lg:flex-col">
          <div className="col-span-2 md:col-span-1">
            <Logo />
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            <SocialsList1 className="flex items-center space-x-2 lg:space-x-0 lg:flex-col lg:space-y-3 lg:items-start" />
          </div>
        </div>
        {widgetMenus.map(renderWidgetMenuItem)}
      </div>
    </div>
  );
};

export default Footer;
