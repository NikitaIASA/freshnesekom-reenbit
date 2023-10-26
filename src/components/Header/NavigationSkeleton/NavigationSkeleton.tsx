import { FC } from "react";

import "./NavigationSkeleton.scss";

export const NavigationSkeleton: FC = () => {
  return (
    <>
      <li className="navigation__item-skeleton"></li>
      <li className="navigation__item-skeleton"></li>
      <li className="navigation__item-skeleton"></li>
      <li className="navigation__item-skeleton"></li>
      <li className="navigation__item-skeleton"></li>
    </>
  );
};
