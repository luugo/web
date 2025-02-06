import React from "react";
import Heading from "./Heading/Heading";

const DiscoverMoreGrid = () => {
  return (
    <div className="nc-DiscoverMoreGrid relative">
      <Heading
        className="mb-12 text-neutral-900 dark:text-neutral-50"
        desc=""
        isCenter
        rightDescText="Good things are waiting for you"
      >
        Discover more
      </Heading>
      <div className="relative grid grid-cols-3 gap-8">

      </div>
    </div>
  );
};

export default DiscoverMoreGrid;
