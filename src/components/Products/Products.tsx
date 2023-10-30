import { FC } from "react";

import { useAppSelector } from "@hooks/useAppSelector";
import { STATUSES } from "@constants/statuses";
import ErrorBlock from "@components/UI/ErrorBlock";
import ProductList from "./ProductList";

import "./Products.scss";

export const Products: FC = () => {
  const { status, error } = useAppSelector((state) => state.products);

  if (status === STATUSES.FAILED) {
    return <ErrorBlock error={error} />;
  }

  return (
    <section className="products">
      <aside className="sidebar">
        SIDEBAR Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Recusandae omnis quo at vero sequi! Labore rerum itaque dolore hic harum
        sequi ipsum magni omnis molestiae perspiciatis? Eveniet sit quidem sint.
      </aside>
      <ProductList status={status} />
    </section>
  );
};
