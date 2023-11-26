import { FC } from "react";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectSelectedProduct } from "@store/selectors/productSelectors";
import Stars from "@components/UI/Stars";

import "./ProductReviews.scss";

export const ProductReviews: FC = () => {
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const reviews = selectedProduct?.extraInfo?.reviews || [];

  return (
    <div className="product-reviews">
      {reviews.length ? (
        <ul className="product-reviews__list">
          {reviews.map((review, index) => (
            <li key={`review-${index}`} className="product-reviews__item">
              <div className="product-reviews__top-block">
                <p className="product-reviews__user">{review.user}</p>
                <Stars rating={review.rating} />
              </div>
              <p className="product-reviews__comment">{review.comment}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
};
