import { UrlObject } from "url";
import { Route } from "next";

export interface CustomLink {
  label: string;
  href: UrlObject | Route;
  targetBlank?: boolean;
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//
