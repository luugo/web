import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export interface SocialsList1Props {
  className?: string;
}

interface SocialType {
  name: string;
  icon: IconProp;
  href: string;
}

const socials: SocialType[] = [
  {
    name: "Facebook",
    icon: faFacebook,
    href: "https://www.facebook.com/profile.php?id=100083365119878",
  },
  {
    name: "Youtube",
    icon: faYoutube,
    href: "https://www.youtube.com/channel/UCtAW7HDg8zt41_Haeqwt2qQ",
  },
  {
    name: "Instagram",
    icon: faInstagram,
    href: "https://www.instagram.com/luugoapp/",
  },
  { name: "Twitter", icon: faTwitter, href: "https://twitter.com/Luugoapp" },
];

const SocialsList1: FC<SocialsList1Props> = ({ className = "space-y-3" }) => {
  const renderItem = (item: SocialType, index: number) => {
    return (
      <a
        href={item.href}
        className="flex items-center text-2xl text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
        key={index}
      >
        <div className="flex-shrink-0 w-5 ">
          <FontAwesomeIcon icon={item.icon}></FontAwesomeIcon>
        </div>
        <span className="hidden lg:block text-sm">{item.name}</span>
      </a>
    );
  };

  return (
    <div className={`nc-SocialsList1 ${className}`} data-nc-id="SocialsList1">
      {socials.map(renderItem)}
    </div>
  );
};

export default SocialsList1;
