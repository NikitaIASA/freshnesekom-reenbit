import { FC } from "react";

import emptyStar from "@assets/images/empty-heart.svg";
import star from "@assets/images/star.svg";

interface StarProps {
  rating: number;
}

export const Stars: FC<StarProps> = ({ rating }) => {
  return (
    <div className="product-card__stars">
      {Array(5)
        .fill(0)
        .map((_, index) => {
          if (index < rating) {
            return <img key={index} src={star} alt="star" />;
          } else {
            return <img key={index} src={emptyStar} alt="empty star" />;
          }
        })}
    </div>
  );
};
