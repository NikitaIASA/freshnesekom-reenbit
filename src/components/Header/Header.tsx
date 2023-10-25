import { FC } from "react";

import Contacts from "./Contacts";
import Navigation from "./Navigation";
import AppBar from "./AppBar";

import "./Header.scss";

export const Header: FC = () => {

  return (
    <header className="header">
      <Contacts/>
      <AppBar/>
      <Navigation/>
    </header>
  );
};
