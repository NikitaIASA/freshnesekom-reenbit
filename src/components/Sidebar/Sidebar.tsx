import { FC, MouseEvent} from "react";

import Categories from "./Categories";
import Brands from "./Brands";
import Rating from "./Rating";
import PriceBlock from "./PriceBlock";

import "./Siderbar.scss";

interface SidebarProps {
  setIsSidebarOpened: (isOpened: boolean) => void;
}

export const Sidebar: FC<SidebarProps> = ({ setIsSidebarOpened }) => {
  
  const handleSidebarClick = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };

  const handleCloseButtonClick = () => {
    setIsSidebarOpened(false);
  };

  return (
    <aside className="sidebar" onClick={handleSidebarClick}>
      <button
        className="sidebar__close-button"
        onClick={handleCloseButtonClick}
      >
        ✖
      </button>
      <Categories />
      <Brands />
      <Rating />
      <PriceBlock />
    </aside>
  );
};
