import { FC } from "react";

import Tags from "./Tags";
import Links from "./Links";

interface FooterProps {}

export const Footer: FC<FooterProps> = () => {
  return (
    <footer className="footer">
      <Links />
      <Tags />
    </footer>
  );
};
