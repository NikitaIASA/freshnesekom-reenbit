import { FC } from "react";

import SidebarSkeleton from "../SidebarSkeleton";
import SidebarSectionTitle from "../SidebarSectionTitle";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { resetPage, setSelectedCategoryWithBrands } from "@store/reducers/productSlice";
import { getCategories } from "@helpers/getCategories";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectProductsState } from "@store/selectors/productSelectors";
import { STATUSES } from "@constants/statuses";
import { ALL_CATEGORIES_FILTER } from "@constants/allCategoriesConst";
import { getProductsCountByCategory } from "@helpers/getProductsCountByCategory";

import "./Categories.scss";

export const Categories: FC = () => {
  const dispatch = useAppDispatch();
  const { products, status, selectedCategory } =
    useAppSelector(selectProductsState);

  const categories = getCategories(products);
  const productCounts = getProductsCountByCategory(products);
  const totalProductCount = products.length;

  const findCountForCategory = (categoryName: string): number => {
    const category = productCounts.find((c) => c.name === categoryName);
    return category ? category.count : 0;
  };

  const handleCategorySelect = (category: string) => {
    dispatch(setSelectedCategoryWithBrands(category));
    dispatch(resetPage());
  };

  return (
    <div className="categories">
      <SidebarSectionTitle title="Categories" />
      {status === STATUSES.LOADING ? (
        <SidebarSkeleton />
      ) : (
        <ul className="categories__list">
          <li
            key="category-all"
            className={`categories__item ${
              selectedCategory === ALL_CATEGORIES_FILTER ? "selected" : ""
            }`}
            onClick={() => handleCategorySelect(ALL_CATEGORIES_FILTER)}
          >
            <p className="categories__name">All Categories</p>
            <p className="categories__count">{totalProductCount}</p>
          </li>
          {categories.map((category) => (
            <li
              key={`category-${category.name}`}
              className={`categories__item ${
                selectedCategory === category.name ? "selected" : ""
              }`}
              onClick={() => handleCategorySelect(category.name)}
            >
              <p className="categories__name">{category.name}</p>
              <p className="categories__count">
                {findCountForCategory(category.name)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
