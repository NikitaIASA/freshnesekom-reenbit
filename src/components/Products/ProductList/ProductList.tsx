import { FC } from "react";

import ProductCard from "../ProductCard";

import "./ProductList.scss";

interface ProductListProps {}

export const ProductList: FC<ProductListProps> = () => {
  return (
    <div className="product-list">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};
