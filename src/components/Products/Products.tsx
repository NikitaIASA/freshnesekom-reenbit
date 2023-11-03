import { FC, useState } from "react";

import { useAppSelector } from "@hooks/useAppSelector";
import { STATUSES } from "@constants/statuses";
import ErrorBlock from "@components/UI/ErrorBlock";
import ProductList from "./ProductList";
import Sidebar from "@components/Sidebar";
import {
  selectFilteredProducts,
  selectProductsState,
} from "@store/selectors/productSelectors";
import filterIcon from "@assets/images/filter-icon.svg";

import "./Products.scss";

export const Products: FC = () => {
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);
  const { status, error } = useAppSelector(selectProductsState);
  const filteredProducts = useAppSelector(selectFilteredProducts);

  if (status === STATUSES.FAILED) {
    return <ErrorBlock error={error} />;
  }

  return (
    <section className="products">
      {isSidebarOpened && (
        <div
          className="products__overlay"
          onClick={() => setIsSidebarOpened(false)}
        ></div>
      )}
      <div className="products__top">
        <h1 className="products__title">All Products</h1>
        <p className="products__count">
          <span className="products__count-number">
            {" "}
            {filteredProducts?.length}{" "}
          </span>
          Products
        </p>
      </div>
      <button
        className="products__filter-button"
        onClick={(e) => {
          e.stopPropagation();
          setIsSidebarOpened(true);
        }}
      >
        <img
          className="products__filter-image"
          src={filterIcon}
          alt="filter icon"
        />
      </button>
      <div className="products__grid">
        <div
          className={`products__sidebar-container ${
            isSidebarOpened ? "sidebar-opened" : ""
          }`}
        >
          <Sidebar setIsSidebarOpened={setIsSidebarOpened} />
        </div>
        <ProductList status={status} />
      </div>
    </section>
  );
};
