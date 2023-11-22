import { FC } from "react";
import { Link } from "react-router-dom";

import Stars from "../../UI/Stars";
import { IProduct } from "@appTypes/products";
import { ROUTE_PATHS } from "@constants/routePaths";
import arrowRight from "@assets/images/arrow-right.svg";
import heart from "@assets/images/heart.svg";
import { ButtonVariants, ButtonSizes} from "@appTypes/buttonTypes";

import "./ProductCard.scss";
import CustomButton from "@components/UI/CustomButton";

interface ProductListProps {
  product: IProduct;
}

export const ProductCard: FC<ProductListProps> = ({ product }) => {
  const {
    id,
    title,
    image,
    description,
    rating,
    brand,
    model,
    delivery,
    stock,
    price,
    shipping,
    buyBy,
  } = product;

  const details = {
    Brand: brand,
    Model: model,
    Delivery: delivery,
    Stock: `${stock} ${buyBy[0]}`,
  };

  return (
    <li className="product-card">
      <div className="product-card__image-block">
        <Link to={`${ROUTE_PATHS.PRODUCTS}/${id}`}>
          <img
            className="product-card__image"
            src={image[0]}
            alt="product image"
          />
        </Link>
      </div>
      <div className="product-card__information">
        <div className="product-card__descriptiption-block">
          <Link to={`${ROUTE_PATHS.PRODUCTS}/${id}`}>
            <h4 className="product-card__title">{title}</h4>
          </Link>
          <p className="product-card__description">{description}</p>
          <Stars rating={rating} />
          <ul className="product-card__details">
            {Object.entries(details).map(([key, value]) => (
              <li className="product-card__details-item" key={key}>
                <p className="product-card__details-title">{key}</p>
                <p
                  className={`product-card__details-value ${
                    key === "Stock" ? "highlighted-value" : ""
                  }`}
                >
                  {value}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="product-card__price-block">
          <div className="product-card__price-block-container">
            <div className="product-card__prices">
              <p className="product-card__new-price">{`${price.current} ${price.currency}`}</p>
              <p className="product-card__old-price">{price.previous}</p>
            </div>
            <div className="product-card__shipping-block">
              <p className="product-card__shipping">{shipping.type}</p>
              <p className="product-card__delivery">{shipping.deliveryTime}</p>
            </div>
          </div>
          <div className="product-card__buttons">
            <Link to={`${ROUTE_PATHS.PRODUCTS}/${id}`}>
              {/* <button className="product-card__details-button">
                <p>Product Detail</p>
                <img src={arrowRight} alt="arrow" />
              </button> */}
              <CustomButton>
                <p>Product Detail</p>
                <img src={arrowRight} alt="arrow" />
              </CustomButton>
            </Link>
            {/* <button className="product-card__wish-button">
              <img src={heart} alt="heart" />
              <p>Add to wish list</p>
            </button> */}
            <CustomButton variant={ButtonVariants.SECONDARY} size={ButtonSizes.SMALL}>
              <img src={heart} alt="heart" />
              <p>Add to wish list</p>
            </CustomButton>
          </div>
        </div>
      </div>
    </li>
  );
};
