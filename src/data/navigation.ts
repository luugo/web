import {NavItemType} from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "Home Page",
    children: [
      {id: ncNanoId(), href: "/", name: "Home  1"},
      {id: ncNanoId(), href: "/", name: "Home  2", isNew: true},
      {id: ncNanoId(), href: "/", name: "Header  1"},
      {id: ncNanoId(), href: "/", name: "Header  2", isNew: true},
      {id: ncNanoId(), href: "/", name: "Coming Soon"},
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Shop Pages",
    children: [
      {id: ncNanoId(), href: "/", name: "Category Page 1"},
      {id: ncNanoId(), href: "/", name: "Category Page 2"},
      {id: ncNanoId(), href: "/", name: "Product Page 1"},
      {id: ncNanoId(), href: "/", name: "Product Page 2"},
      {id: ncNanoId(), href: "/", name: "Cart Page"},
      {id: ncNanoId(), href: "/", name: "Checkout Page"},
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Other Pages",
    children: [
      {id: ncNanoId(), href: "/", name: "Checkout Page"},
      {id: ncNanoId(), href: "/", name: "Search Page"},
      {id: ncNanoId(), href: "/", name: "Cart Page"},
      {id: ncNanoId(), href: "/", name: "Accout Page"},
      {id: ncNanoId(), href: "/", name: "Order Page"},
      {id: ncNanoId(), href: "/", name: "Subscription"},
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Blog Page",
    children: [
      {id: ncNanoId(), href: "/", name: "Blog Page"},
      {id: ncNanoId(), href: "/", name: "Blog Single"},
      {id: ncNanoId(), href: "/", name: "About Page"},
      {id: ncNanoId(), href: "/", name: "Contact Page"},
      {id: ncNanoId(), href: "/", name: "Login"},
      {id: ncNanoId(), href: "/", name: "Signup"},
      {id: ncNanoId(), href: "/", name: "Forgot Password"},
    ],
  },
];

export const NAVIGATION: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/category-type",
    name: "Categorias",
  }
];
