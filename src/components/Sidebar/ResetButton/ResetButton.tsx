import { FC } from "react";

import { useAppDispatch } from "@hooks/useAppDispatch";
import { resetFilter } from "@store/reducers/productSlice";

import "./ResetButton.scss";

export const ResetButton: FC = () => {
  const dispatch = useAppDispatch();

  const handleReset = () => {
    dispatch(resetFilter());

   window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    // Scroll for various parts of the sidebar
    const sidebarElement = document.querySelector(".products__sidebar-container");
    const categoriesList = document.querySelector(".categories__list");
    const brandsList = document.querySelector(".brands__list");

    if (sidebarElement) {
      sidebarElement.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (categoriesList) {
      categoriesList.scrollTo({ top: 0, behavior: "smooth" });
    }
    if (brandsList) {
      brandsList.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="reset">
      <button className="reset__button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};
