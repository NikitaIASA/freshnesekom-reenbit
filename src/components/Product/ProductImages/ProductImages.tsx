import { FC } from "react";

import { useAppSelector } from "@hooks/useAppSelector";
import { selectSelectedProduct } from "@store/selectors/productSelectors";
import { calculateDiscount } from "@helpers/calculateDiscount";
import { SHIPPING_TYPES } from "@constants/shippingTypes";

import "./ProductImages.scss";

interface ProductImagesProps {}

export const ProductImages: FC<ProductImagesProps> = () => {
  const selectedProduct = useAppSelector(selectSelectedProduct);

  const {image = [], price, shipping } = selectedProduct || {};
  const discount = price && calculateDiscount(price.current, price.previous);

  return (
    <div className="product-images">
      <div className="product-images__discount-block">
        <p className="product-images__discount-block-item"> - {discount} %</p>
        {shipping?.type === SHIPPING_TYPES.FREE && (
          <p className="product-images__discount-block-item">Free shipping</p>
        )}
      </div>
      <div className="product-images__images-block">
        <div className="product-images__main-image-container">
          <img
            className="product-images__main-image"
            src={image[0]}
            alt="product image"
          />
        </div>
        <div className="product-images__addition-images-container">
          <img
            className="product-images__addition-image"
            src={image[1]}
            alt="product image"
          />
          <img
            className="product-images__addition-image"
            src={image[2]}
            alt="product image"
          />
        </div>
      </div>
    </div>
  );
};
