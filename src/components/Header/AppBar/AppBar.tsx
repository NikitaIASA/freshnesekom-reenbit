import { FC } from "react";
import { Link } from "react-router-dom";

import UserNavigation from "./UserNavigation";
import SearchBar from "./SearchBar";
import { ROUTE_PATHS } from "@constants/routePaths";
import logo from "@assets/images/logo.svg";

import "./AppBar.scss";

export const AppBar: FC = () => {
  return (
    <div className="app-bar">
      <Link to={ROUTE_PATHS.HOME} className="app-bar__logo">
        <img src={logo} alt="logo" />
      </Link>
      <SearchBar/>
      <UserNavigation/>
    </div>
  );
};
