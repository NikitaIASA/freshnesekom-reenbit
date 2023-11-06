import { FC } from "react";

import SidebarSectionTitle from "../SidebarSectionTitle";
import CustomCheckbox from "../CustomCheckbox";
import { RATING_COUNT } from "@constants/elementsCount";
import yellowStar from "@assets/images/yellow-star.svg";
import starEmpty from "@assets/images/empty-heart.svg";


import "./Rating.scss";

export const Rating: FC = () => {
  return (
    <div className="rating">
      <SidebarSectionTitle title="Rating"/>
      <ul className="rating__list">
        {Array.from({ length: RATING_COUNT }, (_, i) => i + 1).map((rating) => (
          <li className="rating__item" key={rating}>
            <CustomCheckbox isChecked={false} />
            <div className="rating__stars">
              {[...new Array(RATING_COUNT)].map((_, index) => (
                <img
                  className="rating__image"
                  key={index}
                  src={index < rating ? yellowStar : starEmpty}
                  alt={index < rating ? "Full star" : "Empty star"}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
