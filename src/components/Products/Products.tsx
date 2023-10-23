import { FC } from "react";

import ProductList from "./ProductList";

import "./Products.scss";

export const Products: FC = () => {
  return (
    <section className="products">
      <ProductList />
    </section>
  );
};
