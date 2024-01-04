import React, { FC } from "react";
import youtube from "@/images/socials/youtube.svg";
import instagram from "@/images/socials/instagram.svg";
import Image from "next/image";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
}

const socialsDemo = [
  { name: "Youtube", icon: youtube, href: "https://www.youtube.com/channel/UCtAW7HDg8zt41_Haeqwt2qQ" },
  { name: "Instagram", icon: instagram, href: "https://www.instagram.com/luugoapp?utm_source=ig_web_button_share_sheet&igsh=OGQ5ZDc2ODk2ZA==" },
];

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block w-6 h-6",
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
    >
      {socialsDemo.map((item, i) => (
        <a
          key={i}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          <Image sizes="40px" src={item.icon} alt="" />
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
