import { FC, useState } from "react";

import { useAppSelector } from "@hooks/useAppSelector";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { Link } from "react-router-dom";
import {
  resetPage,
  setSelectedBrand,
  setSelectedCategory,
} from "@store/reducers/productSlice";
import { getCategories } from "@helpers/getCategories";
import { STATUSES } from "@constants/statuses";
import NavigationSkeleton from "@components/Header/NavigationSkeleton";
import { selectProductsState } from "@store/selectors/productSelectors";
import { ROUTE_PATHS } from "@constants/routePaths";
import Dropdown from "@components/Dropdown";
import arrow from "@assets/images/arrow-down.svg";

import "./Navigation.scss";

export const Navigation: FC = () => {
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector(selectProductsState);
  const categories = getCategories(products);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleBrandSelect = (brand: string, category: string) => {
    dispatch(setSelectedBrand(brand));
    dispatch(setSelectedCategory(category));
    setActiveCategory(null);
    dispatch(resetPage());
  };

  return (
    <ul className="navigation">
      {status === STATUSES.LOADING ? (
        <NavigationSkeleton />
      ) : (
        categories.map((category) => (
          <li
            key={`nav-${category.name}`}
            className="navigation__item"
            onMouseEnter={() => setActiveCategory(category.name)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <span>{category.name}</span>
            <img src={arrow} alt="arrow" />
            <Link to={ROUTE_PATHS.PRODUCTS}>
              {activeCategory === category.name && (
                <Dropdown
                  items={category.brands}
                  onSelect={(brand) => handleBrandSelect(brand, category.name)}
                />
              )}
            </Link>
          </li>
        ))
      )}
    </ul>
  );
};
