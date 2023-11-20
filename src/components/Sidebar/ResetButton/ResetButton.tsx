import { FC } from "react";

import { useAppDispatch } from "@hooks/useAppDispatch";
import { resetFilter } from "@store/reducers/productSlice";
import { scrollToTop } from "@helpers/scrollToTop";

import "./ResetButton.scss";

export const ResetButton: FC = () => {
  const dispatch = useAppDispatch();

  const handleReset = () => {
    const sidebarElement = document.querySelector(".products__sidebar-container") as HTMLElement | null;
    const categoriesList = document.querySelector(".categories__list") as HTMLElement | null;
    const brandsList = document.querySelector(".brands__list") as HTMLElement | null;
    
    dispatch(resetFilter());
    scrollToTop(window, sidebarElement, categoriesList, brandsList);
  };

  return (
    <div className="reset">
      <button className="reset__button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};
