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
  const skeletons = [...new Array(5)].map((_, index) => (
    <ProductSkeleton key={index} />
  ));

  if (status === STATUSES.LOADING) {
    return <div className="product-list">{skeletons}</div>;
  }

  return (
    <div className="product-list">
      {items?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
