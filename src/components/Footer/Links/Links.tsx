import { FC } from "react";

import { FOOTER_LINKS } from "@constants/footerLinks";

import "./Links.scss";

export const Links: FC = () => {
  return (
    <div className="links">
      {FOOTER_LINKS.map((section) => (
        <ul key={`key-${section.title}`} className="links__list">
          <h2 className="links__title">{section.title}</h2>
          {section.links.map((link) => (
            <li className="links__item" key={`key-${link}`}>
              <a className="links__link" href="#">{link}</a>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
};
