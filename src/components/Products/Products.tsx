import { FC, MouseEvent } from "react";

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
import { useModal } from "@hooks/useModal";

import "./Products.scss";

export const Products: FC = () => {
  const {
    isModalOpened: isSidebarOpened,
    setIsModalOpened: setIsSidebarOpened,
  } = useModal();
  const { status, error } = useAppSelector(selectProductsState);
  const filteredProducts = useAppSelector(selectFilteredProducts);

  const handleOverlayClick = () => {
    setIsSidebarOpened(false);
  };

  const handleFilterButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsSidebarOpened(true);
  };

  if (status === STATUSES.FAILED) {
    return <ErrorBlock error={error} />;
  }

  return (
    <section className="products">
      {isSidebarOpened && (
        <div className="products__overlay" onClick={handleOverlayClick}></div>
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
        onClick={handleFilterButtonClick}
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
