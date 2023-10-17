import { FC } from "react";
import { NavLink } from "react-router-dom";

import { ROUTE_PATHS } from "@constants/routePaths";

import "./Header.scss";

export const Header: FC = () => {
  const testId = Math.floor(Math.random() * 1000);

  return (
    <header className="header">
      <nav className="header__navigation">
        <NavLink to={ROUTE_PATHS.HOME}>Home</NavLink>
        <NavLink to={ROUTE_PATHS.PRODUCTS}>Products</NavLink>
        <NavLink to={`${ROUTE_PATHS.PRODUCTS}/${testId}`}>Product</NavLink>
      </nav>
    </header>
  );
};
