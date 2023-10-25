import { FC } from "react";

import "./Contacts.scss";

export const Contacts: FC = () => {
  return (
    <div className="contacts">
      <ul className="contacts__left-block">
        <li className="contacts__item">
          <a className="contacts__link" href="#">
            Chat with us
          </a>
        </li>
        <li className="contacts__item">
          <a
            className="contacts__link contacts__link_black"
            href="tel:+420336775664"
          >
            +420 336 775 664
          </a>
        </li>
        <li className="contacts__item">
          <a
            className="contacts__link contacts__link_black"
            href="mailto:info@freshnesecom.com"
          >
            info@freshnesecom.com
          </a>
        </li>
      </ul>
      <ul className="contacts__right-block">
        <li className="contacts__item">
          <a className="contacts__link" href="#">
            Blog
          </a>
        </li>
        <li className="contacts__item">
          <a className="contacts__link" href="#">
            About us
          </a>
        </li>
        <li className="contacts__item">
          <a className="contacts__link" href="#">
            Careers
          </a>
        </li>
      </ul>
    </div>
  );
};
