import { FC } from "react";

import ProductCard from "../ProductCard";
import { IProduct } from "@appTypes/products";

import "./ProductList.scss";

interface ProductListProps {
  items: IProduct[];
}

export const ProductList: FC<ProductListProps> = ({ items }) => {
  return (
    <div className="product-list">
      {items?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
