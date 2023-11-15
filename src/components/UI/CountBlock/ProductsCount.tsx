import { FC } from "react";

import "./ProductsCount.scss";

interface ProductsCountProps {
  count: number;
}

export const ProductsCount: FC<ProductsCountProps> = ({ count }) => {
  return (
    <p className="products-count">
      <span className="products-count__number">{count} </span>
      Products
    </p>
  );
};
