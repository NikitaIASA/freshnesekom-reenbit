import { FC } from "react";

import Tags from "./Tags";
import Links from "./Links";

import "./Footer.scss";

export const Footer: FC = () => {
  return (
    <footer className="footer">
      <Links />
      <Tags />
    </footer>
  );
};
