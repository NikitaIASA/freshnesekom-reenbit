import { FC } from "react";

import "./ProductSkeleton.scss";

interface ProductSkeletonProps {}

export const ProductSkeleton: FC<ProductSkeletonProps> = () => {
  return (
    <div className="product-skeleton">
      <div className="product-skeleton__images">
        <div className="product-skeleton__main-image"></div>
        <div className="product-skeleton__additional-images">
          <div className="product-skeleton__additional-image"></div>
          <div className="product-skeleton__additional-image"></div>
        </div>
      </div>
      <div className="product-skeleton__information">
        <div className="product-skeleton__title"></div>
        <div className="product-skeleton__reviews"></div>
        <div className="product-skeleton__description"></div>
        <div className="product-skeleton__details">
          <div className="product-skeleton__details-block">
            <div className="product-skeleton__details-item"></div>
            <div className="product-skeleton__details-item"></div>
            <div className="product-skeleton__details-item"></div>
            <div className="product-skeleton__details-item"></div>
          </div>
          <div className="product-skeleton__details-block">
            <div className="product-skeleton__details-item"></div>
            <div className="product-skeleton__details-item"></div>
            <div className="product-skeleton__details-item"></div>
            <div className="product-skeleton__details-item"></div>
          </div>
        </div>
        <div className="product-skeleton__price-block">
          <div className="product-skeleton__price-block-item"></div>
          <div className="product-skeleton__price-block-item"></div>
          <div className="product-skeleton__price-block-item"></div>
        </div>
      </div>
    </div>
  );
};
