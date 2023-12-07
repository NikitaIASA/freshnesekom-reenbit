import { FC } from "react";
import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@constants/routePaths";

import { IProduct } from "@appTypes/products";
import CustomButton from "@components/UI/CustomButton";
import { ButtonSizes } from "@appTypes/buttonTypes";
import { calculateDiscount } from "@helpers/calculateDiscount";

import "./SuggestedProduct.scss";

interface SuggestedProductProps {
  product: IProduct;
}

export const SuggestedProduct: FC<SuggestedProductProps> = ({ product }) => {
  const { id, image, title, description, price } = product;

  const discount = price && price.previous && calculateDiscount(price.current, price.previous);

  return (
    <div className="suggested-product">
      <Link to={`${ROUTE_PATHS.PRODUCTS}/${id}`}>
        <img
          className="suggested-product__image"
          src={image[0]}
          alt="image of suggested product"
        />
      </Link>
      <Link to={`${ROUTE_PATHS.PRODUCTS}/${id}`}>
        <h4 className="suggested-product__title">{title}</h4>
      </Link>
      <p className="suggested-product__description">{description}</p>
      <div className="suggested-product__price-block">
        <div className="suggested-product__prices">
          <p className="suggested-product__price">
            {price.current} {price.currency}
          </p>
          {price.previous && (
            <p className="suggested-product__old-price">{price.previous}</p>
          )}
        </div>
        <Link to={`${ROUTE_PATHS.PRODUCTS}/${id}`}>
          <CustomButton
            size={ButtonSizes.SMALL}
            className="suggested-product__button"
          >
            Buy now
          </CustomButton>
        </Link>
      </div>
      <span className="suggested-product__discount">- {discount} %</span>
    </div>
  );
};
