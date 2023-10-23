import { FC } from "react";
import greyBg from "@assets/images/grey-bg.jpg";
import arrowRight from "@assets/images/arrow-right.svg";
import heart from "@assets/images/heart.svg";
import star from "@assets/images/star.svg";

import "./ProductCard.scss";

export const ProductCard: FC = () => {
  return (
    <div className="product-card">
      <div className="product-card__image-block">
        <img className="product-card__image" src={greyBg} alt="product image" />
      </div>
      <div className="product-card__information">
        <div className="product-card__descriptiption-block">
          <h4 className="product-card__title">Product title</h4>
          <p className="product-card__description">
            Space for a small product description{" "}
          </p>
          <div className="product-card__stars">
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <img src={star} alt="star" />
          </div>
          <ul className="product-card__details">
            <li className="product-card__details-item">
              <p className="product-card__details-title">Fresheness</p>
              <p className="product-card__details-value">New</p>
            </li>
            <li className="product-card__details-item">
              <p className="product-card__details-title">Farm</p>
              <p className="product-card__details-value">Grocery Tarm Fields</p>
            </li>
            <li className="product-card__details-item">
              <p className="product-card__details-title">Delivery</p>
              <p className="product-card__details-value">Europe</p>
            </li>
            <li className="product-card__details-item">
              <p className="product-card__details-title">Stock</p>
              <p className="product-card__details-value">320 pcs</p>
            </li>
          </ul>
        </div>
        <div className="product-card__price-block">
          <p className="product-card__new-price">36.99 USD</p>
          <p className="product-card__old-price">48.56</p>

          <div className="product-card__shipping-block">
            <p className="product-card__shipping">Free Shipping</p>
            <p className="product-card__delivery">Delivery in 1 day</p>
          </div>
          <div className="product-card__buttons">
            <button className="product-card__details-button">
              <p>Product Detail</p>
              <img src={arrowRight} alt="arrow" />
            </button>
            <button className="product-card__wish-button">
              <img src={heart} alt="heart" />
              <p>Add to wish list</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
