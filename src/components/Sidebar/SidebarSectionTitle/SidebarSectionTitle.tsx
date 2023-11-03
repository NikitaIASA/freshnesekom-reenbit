import { FC } from "react";

interface SidebarSectionTitleProps {
  title: string;
}

import "./SidebarSectionTitle.scss";

export const SidebarSectionTitle: FC<SidebarSectionTitleProps> = ({
  title,
}) => {
  return <h2 className="sidebar-section-title">{title}</h2>;
};
