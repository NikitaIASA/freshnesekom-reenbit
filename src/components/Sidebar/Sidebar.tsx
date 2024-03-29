import { FC, MouseEvent } from "react";

import Categories from "./Categories";
import Brands from "./Brands";
import Rating from "./Rating";
import PriceBlock from "./PriceBlock";
import ResetButton from "./ResetButton";
import closeIcon from "@assets/images/clear-icon.svg";

import "./Siderbar.scss";

interface SidebarProps {
  closeSidebar: () => void;
}

export const Sidebar: FC<SidebarProps> = ({ closeSidebar }) => {
  const handleSidebarClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const handleCloseButtonClick = () => {
    closeSidebar();
  };

  return (
    <aside className="sidebar" onClick={handleSidebarClick}>
      <div className="sidebar__header">
        <button
          className="sidebar__close-button"
          onClick={handleCloseButtonClick}
        >
          <img
            className="sidebar__close-image"
            src={closeIcon}
            alt="close icon"
          />
        </button>
      </div>

      <div className="sidebar__content">
        <Categories />
        <Brands />
        <Rating />
        <PriceBlock />
        <ResetButton />
      </div>
    </aside>
  );
};
