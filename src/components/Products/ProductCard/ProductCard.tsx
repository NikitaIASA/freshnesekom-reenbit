import { FC } from "react";
import { Link } from "react-router-dom";

import Stars from "./Stars";
import { IProduct } from "@appTypes/products";
import { ROUTE_PATHS } from "@constants/routePaths";
import arrowRight from "@assets/images/arrow-right.svg";
import heart from "@assets/images/heart.svg";

import "./ProductCard.scss";

interface ProductListProps {
  product: IProduct;
}

export const ProductCard: FC<ProductListProps> = ({ product }) => {
  return (
    <div className="product-card">
      <div className="product-card__image-block">
        <img
          className="product-card__image"
          src={product.image}
          alt="product image"
        />
      </div>
      <div className="product-card__information">
        <div className="product-card__descriptiption-block">
          <Link to={`${ROUTE_PATHS.PRODUCTS}/${product.title}`}>
            <h4 className="product-card__title">{product.title}</h4>
          </Link>
          <p className="product-card__description">{product.description}</p>
          <Stars rating={product.rating} />
          <ul className="product-card__details">
            {Object.entries(product.details).map(([key, value]) => (
              <li className="product-card__details-item" key={key}>
                <p className="product-card__details-title">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
                <p className="product-card__details-value">{value}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="product-card__price-block">
          <div className="product-card__test">
            <div className="product-card__prices">
              <p className="product-card__new-price">{`${product.price.current} ${product.price.currency}`}</p>
              <p className="product-card__old-price">
                {product.price.previous}
              </p>
            </div>
            <div className="product-card__shipping-block">
              <p className="product-card__shipping">{product.shipping.type}</p>
              <p className="product-card__delivery">
                {product.shipping.deliveryTime}
              </p>
            </div>
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
