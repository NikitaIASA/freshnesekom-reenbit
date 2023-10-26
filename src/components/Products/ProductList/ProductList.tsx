import { FC } from "react";
import ProductCard from "../ProductCard";
import { ProductSkeleton } from "@components/Products/ProductSkeleton/ProductSkeleton";
import { IProduct } from "@appTypes/products";
import { STATUSES } from "@constants/statuses";

import "./ProductList.scss";

interface ProductListProps {
  items: IProduct[];
  status: string;
}

export const ProductList: FC<ProductListProps> = ({ items, status }) => {
  if (status === STATUSES.LOADING) {
    return (
      <div className="product-list">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
      </div>
    );
  }

  return (
    <div className="product-list">
      {items?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
