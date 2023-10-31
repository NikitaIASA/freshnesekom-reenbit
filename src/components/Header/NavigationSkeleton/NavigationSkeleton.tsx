import { FC } from "react";

import "./NavigationSkeleton.scss";

import { NAVIGATION_SKELETON_COUNT } from "@constants/elementsCount";

export const NavigationSkeleton: FC = () => {
  return (
    <>
      {[...new Array(NAVIGATION_SKELETON_COUNT)].map((_, index) => (
        <li key={index} className="navigation__item-skeleton"></li>
      ))}
    </>
  );
};
