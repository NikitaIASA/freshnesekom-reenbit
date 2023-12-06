import { FC } from "react";

import ProductImages from "./ProductImages";
import ProductInfoBlock from "./ProductDescription";
import SuggestedProductsList from "./SuggestedProductsList";

import "./Product.scss";

export const Product: FC = () => {
  return (
    <div className="product">
      <div className="product__info">
        <ProductImages />
        <ProductInfoBlock />
      </div>
      <SuggestedProductsList />
    </div>
  );
};
