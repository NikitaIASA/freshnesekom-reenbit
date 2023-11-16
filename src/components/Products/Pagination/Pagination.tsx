import { FC, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import {
  selectFilteredProducts,
  selectProducts,
} from "@store/selectors/productSelectors";
import {
  setCurrentPage,
  setShownProducts,
  setItemsPerPageByPage,
} from "@store/reducers/productSlice";
import {
  selectCurrentPage,
  selectItemsPerPageByPage,
} from "@store/selectors/paginationSelectors";
import {
  calculatePagesCount,
  getItemRangeForPage,
} from "@helpers/paginationHelpers";
import ProductsCount from "@components/UI/CountBlock";
import arrowDown from "@assets/images/arrow-down-white.svg";

import "./Pagination.scss";

const ADD_ITEMS_PER_PAGE = 5;
const DEFAULT_ITEMS_PER_PAGE = 5;

export const Pagination: FC = () => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(selectProducts);
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const currentPage = useAppSelector(selectCurrentPage);
  const itemsPerPageByPage = useAppSelector(selectItemsPerPageByPage);

  const handleAddProducts = () => {
    const updatedItemsPerPageByPage = {
      ...itemsPerPageByPage,
      [currentPage]:
        (itemsPerPageByPage[currentPage] || DEFAULT_ITEMS_PER_PAGE) +
        ADD_ITEMS_PER_PAGE,
    };
    dispatch(setItemsPerPageByPage(updatedItemsPerPageByPage));
  };

  const pagesCount = calculatePagesCount(
    filteredProducts,
    itemsPerPageByPage,
    DEFAULT_ITEMS_PER_PAGE
  );

  const handleClick = (event: { selected: number }) => {
    dispatch(setCurrentPage(event.selected + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const { firstItem, lastItem } = getItemRangeForPage(
      currentPage,
      itemsPerPageByPage,
      DEFAULT_ITEMS_PER_PAGE
    );
    const itemsToShow = filteredProducts.slice(firstItem, lastItem);

    dispatch(setShownProducts(itemsToShow));
  }, [currentPage, itemsPerPageByPage, filteredProducts, dispatch]);

  return (
    <div className="pagination">
      <div className="pagination__container">
        <p className="pagination__title">Page:</p>
        <ReactPaginate
          containerClassName="pagination__items"
          pageLinkClassName="pagination__item"
          breakLinkClassName="pagination__item"
          activeLinkClassName="pagination__item_active"
          disabledClassName="pagination__item_disabled"
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
          onPageChange={handleClick}
          breakLabel="..."
          pageCount={pagesCount}
          forcePage={currentPage - 1}
          previousLabel={null}
          nextLabel={null}
        />
      </div>
      <button
        className="pagination__button"
        type="button"
        onClick={handleAddProducts}
        disabled={currentPage >= pagesCount}
      >
        Show more products
        <img src={arrowDown} alt="arrow down" />
      </button>
      <ProductsCount count={allProducts?.length || 0} />
    </div>
  );
};
