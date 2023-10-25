import { FC } from "react";
import { useAppSelector } from "@hooks/useAppSelector";

import ProductList from "./ProductList";

import "./Products.scss";

export const Products: FC = () => {
  const { products } = useAppSelector((state) => state.products);

  return (
    <section className="products">
      <ProductList items={products} />
    </section>
  );
};
