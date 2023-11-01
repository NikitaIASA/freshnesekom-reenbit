import { FC } from "react";

import { useAppSelector } from "@hooks/useAppSelector";
import { STATUSES } from "@constants/statuses";
import ErrorBlock from "@components/UI/ErrorBlock";
import ProductList from "./ProductList";
import {
  selectFilteredProducts,
  selectProductsState,
} from "@store/selectors/productSelectors";

import "./Products.scss";

export const Products: FC = () => {
  const { status, error } = useAppSelector(selectProductsState);
  const filteredProducts = useAppSelector(selectFilteredProducts);

  if (status === STATUSES.FAILED) {
    return <ErrorBlock error={error} />;
  }

  return (
    <section className="products">
      <div className="products__top">
        <h1 className="products__title">All Products</h1>
        <p className="products__count">
          <span className="products__count-number"> {filteredProducts?.length} </span>
          Products
        </p>
      </div>
      <div className="test">
        <aside className="sidebar">
          SIDEBAR Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Recusandae omnis quo at vero sequi! Labore rerum itaque dolore hic
          harum sequi ipsum magni omnis molestiae perspiciatis? Eveniet sit
          quidem sint.
        </aside>
        <ProductList status={status} />
      </div>
    </section>
  );
};
