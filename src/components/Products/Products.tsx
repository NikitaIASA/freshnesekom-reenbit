import { FC } from "react";
import { useAppSelector } from "@hooks/useAppSelector";

import ProductList from "./ProductList";

import "./Products.scss";

export const Products: FC = () => {
  const { products, status } = useAppSelector((state) => state.products);

  return (
    <section className="products">
      <aside className="sidebar">SIDEBAR Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae omnis quo at vero sequi! Labore rerum itaque dolore hic harum sequi ipsum magni omnis molestiae perspiciatis? Eveniet sit quidem sint.</aside>
      <ProductList items={products} status={status} />
    </section>
  );
};
