import { NavItemType } from "@/shared/Navigation/NavigationItem";
import ncNanoId from "@/utils/ncNanoId";

export const MEGAMENU_TEMPLATES: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/#",
    name: "Home Page",
    children: [
      { id: ncNanoId(), href: "/", name: "Home  1" },
      { id: ncNanoId(), href: "/templates/home-2", name: "Home  2", isNew: true },
      { id: ncNanoId(), href: "/", name: "Header  1" },
      { id: ncNanoId(), href: "/templates/home-2", name: "Header  2", isNew: true },
      { id: ncNanoId(), href: "/", name: "Coming Soon" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Shop Pages",
    children: [
      { id: ncNanoId(), href: "/templates/collection", name: "Category Page 1" },
      { id: ncNanoId(), href: "/templates/collection-2", name: "Category Page 2" },
      { id: ncNanoId(), href: "/templates/product-detail", name: "Product Page 1" },
      { id: ncNanoId(), href: "/templates/product-detail-2", name: "Product Page 2" },
      { id: ncNanoId(), href: "/templates/cart", name: "Cart Page" },
      { id: ncNanoId(), href: "/templates/checkout", name: "Checkout Page" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Other Pages",
    children: [
      { id: ncNanoId(), href: "/templates/checkout", name: "Checkout Page" },
      { id: ncNanoId(), href: "/templates/search", name: "Search Page" },
      { id: ncNanoId(), href: "/templates/cart", name: "Cart Page" },
      { id: ncNanoId(), href: "/templates/account", name: "Accout Page" },
      { id: ncNanoId(), href: "/templates/account-order", name: "Order Page" },
      { id: ncNanoId(), href: "/templates/subscription", name: "Subscription" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/#",
    name: "Blog Page",
    children: [
      { id: ncNanoId(), href: "/templates/blog", name: "Blog Page" },
      { id: ncNanoId(), href: "/templates/blog-single", name: "Blog Single" },
      { id: ncNanoId(), href: "/templates/about", name: "About Page" },
      { id: ncNanoId(), href: "/templates/contact", name: "Contact Page" },
      { id: ncNanoId(), href: "/templates/login", name: "Login" },
      { id: ncNanoId(), href: "/templates/signup", name: "Signup" },
      { id: ncNanoId(), href: "/templates/forgot-pass", name: "Forgot Password" },
    ],
  },
];

const OTHER_PAGE_CHILD: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/",
    name: "Home Demo 1",
  },
  {
    id: ncNanoId(),
    href: "/templates/home-2",
    name: "Home Demo 2",
  },
  {
    id: ncNanoId(),
    href: "/templates/collection",
    name: "Category Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/templates/collection",
        name: "Category page 1",
      },
      {
        id: ncNanoId(),
        href: "/templates/collection-2",
        name: "Category page 2",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/templates/product-detail",
    name: "Product Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/templates/product-detail",
        name: "Product detail 1",
      },
      {
        id: ncNanoId(),
        href: "/templates/product-detail-2",
        name: "Product detail 2",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/templates/cart",
    name: "Cart Page",
  },
  {
    id: ncNanoId(),
    href: "/templates/checkout",
    name: "Checkout Page",
  },
  {
    id: ncNanoId(),
    href: "/templates/search",
    name: "Search Page",
  },
  {
    id: ncNanoId(),
    href: "/templates/account",
    name: "Account Page",
  },
  {
    id: ncNanoId(),
    href: "/templates/about",
    name: "Other Pages",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/templates/about",
        name: "About",
      },
      {
        id: ncNanoId(),
        href: "/contact",
        name: "Contact us",
      },
      {
        id: ncNanoId(),
        href: "/login",
        name: "Login",
      },
      {
        id: ncNanoId(),
        href: "/templates/signup",
        name: "Signup",
      },
      {
        id: ncNanoId(),
        href: "/templates/subscription",
        name: "Subscription",
      },
      { id: ncNanoId(), href: "/templates/forgot-pass", name: "Forgot Password" },
    ],
  },
  {
    id: ncNanoId(),
    href: "/templates/blog",
    name: "Blog Page",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/templates/blog",
        name: "Blog Page",
      },
      {
        id: ncNanoId(),
        href: "/templates/blog-single",
        name: "Blog Single",
      },
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
