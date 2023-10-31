import { FC } from "react";

import { STARS_COUNT } from "@constants/elementsCount";
import emptyStar from "@assets/images/empty-heart.svg";
import star from "@assets/images/star.svg";

import "./Stars.scss";

interface StarProps {
  rating: number;
}

export const Stars: FC<StarProps> = ({ rating }) => {
  return (
    <ul className="stars">
      {[...new Array(STARS_COUNT)].map((_, index) => (
        <li key={index}>
          <img
            src={index < rating ? star : emptyStar}
            alt={index < rating ? "star" : "empty star"}
          />
        </li>
      ))}
    </ul>
  );
};
