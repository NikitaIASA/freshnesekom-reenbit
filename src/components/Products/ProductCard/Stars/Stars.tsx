import { FC } from "react";

import emptyStar from "@assets/images/empty-heart.svg";
import star from "@assets/images/star.svg";

interface StarProps {
  rating: number;
}

export const Stars: FC<StarProps> = ({ rating }) => {
  return (
    <div className="product-card__stars">
      {[...new Array(5)].map((_, index) => (
        <img
          key={index}
          src={index < rating ? star : emptyStar}
          alt={index < rating ? "star" : "empty star"}
        />
      ))}
    </div>
  );
};
