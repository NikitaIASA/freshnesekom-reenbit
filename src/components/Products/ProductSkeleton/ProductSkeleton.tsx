import { FC } from "react";
import "./ProductSkeleton.scss";

export const ProductSkeleton: FC = () => {
  return (
    <div className="product-skeleton">
      <div className="product-skeleton__image"></div>
      <div className="product-skeleton__details">
        <div className="product-skeleton__title"></div>
        <div className="product-skeleton__description"></div>
        <div className="product-skeleton__stars"></div>
        <div className="product-skeleton__info"></div>
        <div className="product-skeleton__info"></div>
        <div className="product-skeleton__info"></div>
        <div className="product-skeleton__info"></div>
      </div>
      <div className="product-skeleton__price-block">
        <div className="product-skeleton__prices">
          <div className="product-skeleton__price"></div>
          <div className="product-skeleton__price"></div>
        </div>
        <div className="product-skeleton__prices">
          <div className="product-skeleton__price"></div>
          <div className="product-skeleton__price"></div>
        </div>
        <div className="product-skeleton__buttons">
          <div className="product-skeleton__button"></div>
          <div className="product-skeleton__button"></div>
        </div>
      </div>
    </div>
  );
};
