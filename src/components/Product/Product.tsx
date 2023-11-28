import { FC } from "react";

import ProductImages from "./ProductImages";
import ProductInfoBlock from "./ProductDescription";

import "./Product.scss";

export const Product: FC = () => {
  return (
    <div className="product">
      <ProductImages />
      <ProductInfoBlock />
    </div>
  );
};
