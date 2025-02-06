import React, {FC} from "react";
import MainNavigation from "./MainNavigation";

export type HeaderLoggedProps = object

const Header: FC<HeaderLoggedProps> = () => {
  return (
    <div className="nc-HeaderLogged sticky top-0 w-full z-40 ">
      <MainNavigation/>
    </div>
  );
};

export default Header;
