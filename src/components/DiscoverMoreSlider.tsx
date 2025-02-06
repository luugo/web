"use client";

import React, {useEffect, useRef, useState} from "react";
import Heading from "./Heading/Heading";
import Glide from "@glidejs/glide";

const DiscoverMoreSlider = () => {
  const sliderRef = useRef(null);

  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const OPTIONS: Partial<Glide.Options> = {
      // direction: document.querySelector("html")?.getAttribute("dir") || "ltr",
      perView: 2.8,
      gap: 32,
      bound: true,
      breakpoints: {
        1280: {
          gap: 28,
          perView: 2.5,
        },
        1279: {
          gap: 20,
          perView: 2.15,
        },
        1023: {
          gap: 20,
          perView: 1.6,
        },
        768: {
          gap: 20,
          perView: 1.2,
        },
        500: {
          gap: 20,
          perView: 1,
        },
      },
    };
    if (!sliderRef.current) return;

    const slider = new Glide(sliderRef.current, OPTIONS);
    slider.mount();
    setIsShow(true);
    return () => {
      slider.destroy();
    };
  }, [sliderRef]);

  return (
    <div
      ref={sliderRef}
      className={`nc-DiscoverMoreSlider nc-p-l-container ${
        isShow ? "" : "invisible"
      }`}
    >
      <Heading
        className="mb-12 lg:mb-14 text-neutral-900 dark:text-neutral-50 nc-p-r-container "
        desc=""
        rightDescText="Good things are waiting for you"
        hasNextPrev
      >
        Discover more
      </Heading>
      <div className="" data-glide-el="track">
        <ul className="glide__slides">

        </ul>
      </div>
    </div>
  );
};

export default DiscoverMoreSlider;
