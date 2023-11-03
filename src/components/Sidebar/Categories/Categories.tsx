import { FC } from "react";

import { getCategories } from "@helpers/getCategories";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectProductsState } from "@store/selectors/productSelectors";

import "./Categories.scss";

export const Categories: FC = () => {
  const { products } = useAppSelector(selectProductsState);
  const categories = getCategories(products);

  return (
    <div className="categories">
      <h2 className="categories__title">Categories</h2>
      <ul className="categories__list">
        {categories.map((category) => (
          <li key={`category-${category.name}`} className="categories__item">
            <p className="categories__name"> {category.name} </p>
            <p className="categories__count">1000</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
