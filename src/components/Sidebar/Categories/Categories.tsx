import { FC } from "react";

import SidebarSkeleton from "../SidebarSkeleton";
import SidebarSectionTitle from "../SidebarSectionTitle";
import { getCategories } from "@helpers/getCategories";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectProductsState } from "@store/selectors/productSelectors";
import { STATUSES } from "@constants/statuses";

import "./Categories.scss";

export const Categories: FC = () => {
  const { products, status } = useAppSelector(selectProductsState);
  const categories = getCategories(products);

  return (
    <div className="categories">
      <SidebarSectionTitle title="Categories" />
      {status === STATUSES.LOADING ? (
        <SidebarSkeleton />
      ) : (
        <ul className="categories__list">
          {categories.map((category) => (
            <li key={`category-${category.name}`} className="categories__item">
              <p className="categories__name"> {category.name} </p>
              <p className="categories__count">1000</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
