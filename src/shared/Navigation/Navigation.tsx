import React from "react";
import NavigationItem from "./NavigationItem";
import { NAVIGATION } from "@/data/navigation";

function Navigation() {
  return (
    <ul className="nc-Navigation flex items-center">
      {NAVIGATION.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  );
}

export default Navigation;
