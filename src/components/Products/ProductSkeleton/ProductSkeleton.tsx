import { FC } from "react";
import "./ProductSkeleton.scss";

export const ProductsSkeleton: FC = () => {
  return (
    <div className="products-skeleton">
      <div className="products-skeleton__image"></div>
      <div className="products-skeleton__details">
        <div className="products-skeleton__title"></div>
        <div className="products-skeleton__description"></div>
        <div className="products-skeleton__stars"></div>
        <div className="products-skeleton__info"></div>
        <div className="products-skeleton__info"></div>
        <div className="products-skeleton__info"></div>
        <div className="products-skeleton__info"></div>
      </div>
      <div className="products-skeleton__price-block">
        <div className="products-skeleton__prices">
          <div className="products-skeleton__price"></div>
          <div className="products-skeleton__price"></div>
        </div>
        <div className="products-skeleton__prices">
          <div className="products-skeleton__price"></div>
          <div className="products-skeleton__price"></div>
        </div>
        <div className="products-skeleton__buttons">
          <div className="products-skeleton__button"></div>
          <div className="products-skeleton__button"></div>
        </div>
      </div>
    </div>
  );
};
