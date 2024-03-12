import Image, { StaticImageData } from "next/image";
import Logo from "@/shared/Logo/Logo";
import { Route } from "@/routers/types";
import imageRightPng from "@/images/hero-right.png";
import imageRightPng2 from "@/images/hero-right-2.png";
import imageRightPng3 from "@/images/hero-right-3.png";

interface Hero2DataType {
  image: StaticImageData | string;
  heading: string;
  subHeading: string;
  btnText: string;
  btnLink: Route;
}

export const HERO2_DEMO_DATA: Hero2DataType[] = [
  {
    image: imageRightPng2,
    heading: "Precisou? Alugou!",
    subHeading: "",
    btnText: "Cadastre-se!",
    btnLink: "/signup",
  },
  {
    image: imageRightPng3,
    heading: "Por quê comprar se você pode Alugar?",
    subHeading: "",
    btnText: "Cadastre-se!",
    btnLink: "/signup",
  },
  {
    image: imageRightPng,
    heading: "Quer economizar? Alugue!",
    subHeading: "",
    btnText: "Cadastre-se!",
    btnLink: "/signup",
  },
];
