import { FC, ChangeEvent } from "react";

import SidebarSectionTitle from "../SidebarSectionTitle";
import CustomCheckbox from "../CustomCheckbox";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { toggleRating } from "@store/reducers/productSlice";
import { selectSelectedRatings } from "@store/selectors/productSelectors";
import yellowStar from "@assets/images/yellow-star.svg";
import starEmpty from "@assets/images/empty-heart.svg";

import "./Rating.scss";

export const Rating: FC = () => {
  const dispatch = useAppDispatch();
  const selectedRatings = useAppSelector(selectSelectedRatings);

  const handleRatingToggle = (rating: number) => {
    dispatch(toggleRating(rating));
  };

  const handleRatingChange = (
    event: ChangeEvent<HTMLInputElement>,
    rating: number
  ) => {
    event.stopPropagation();
    handleRatingToggle(rating);
  };

  return (
    <div className="rating">
      <SidebarSectionTitle title="Rating" />
      <ul className="rating__list">
        {Array.from({ length: 5 }, (_, i) => 5 - i).map((rating) => (
          <li
            className="rating__item"
            key={`rating-${rating}`}
            onClick={() => handleRatingToggle(rating)}
          >
            <CustomCheckbox
              isChecked={selectedRatings.includes(rating)}
              onChange={(event) => handleRatingChange(event, rating)}
            />
            <div className="rating__stars">
              {[...new Array(5)].map((_, index) => (
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
