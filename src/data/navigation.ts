import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";

export const NAVIGATION: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/account-rentable",
    name: "Meus Anúncios",
  },
];
