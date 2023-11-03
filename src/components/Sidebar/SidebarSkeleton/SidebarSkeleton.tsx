import { FC } from "react";

import "./SidebarSkeleton.scss";

import { NAVIGATION_SKELETON_COUNT } from "@constants/elementsCount";

export const SidebarSkeleton: FC = () => {
  return (
    <ul className="sidebar-skeleton">
      {[...new Array(NAVIGATION_SKELETON_COUNT)].map((_, index) => (
        <li key={index} className="sidebar-skeleton__item"></li>
      ))}
    </ul>
  );
};
