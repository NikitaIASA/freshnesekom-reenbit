import { FC, MouseEvent } from "react";

import { useAppSelector } from "@hooks/useAppSelector";
import { STATUSES } from "@constants/statuses";
import ErrorBlock from "@components/UI/ErrorBlock";
import ProductList from "./ProductList";
import Sidebar from "@components/Sidebar";
import SortBlock from "./SortBlock";
import {
  selectFilteredProducts,
  selectProductsState,
} from "@store/selectors/productSelectors";
import filterIcon from "@assets/images/filter-icon.svg";
import { useModal } from "@hooks/useModal";
import Pagination from "./Pagination";
import ProductsCount from "@components/UI/CountBlock";

import "./Products.scss";

export const Products: FC = () => {
  const {
    isModalOpened: isSidebarOpened,
    openModal: openSidebar,
    closeModal: closeSidebar,
  } = useModal();
  const { status, error } = useAppSelector(selectProductsState);
  const filteredProducts = useAppSelector(selectFilteredProducts);

  const handleOverlayClick = () => {
    closeSidebar();
  };

  const handleFilterButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    openSidebar();
  };

  if (status === STATUSES.FAILED) {
    return <ErrorBlock error={error} />;
  }

  return (
    <section className="products">
      {isSidebarOpened && (
        <div className="products__overlay" onClick={handleOverlayClick}></div>
      )}
      <h1 className="products__title">All Products</h1>
      <div className="products__top">
        <SortBlock />
        <ProductsCount count={filteredProducts?.length || 0} />
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
          <Sidebar closeSidebar={closeSidebar} />
        </div>
        <ProductList status={status} />
      </div>
      <Pagination />
    </section>
  );
};
