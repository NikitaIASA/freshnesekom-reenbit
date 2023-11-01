import { FC } from "react";
import { Link } from "react-router-dom";

import { useAppSelector } from "@hooks/useAppSelector";
import {
  selectFilteredProducts,
  selectSearchQuery,
  selectCategory,
} from "@store/selectors/productSelectors";
import { ROUTE_PATHS } from "@constants/routePaths";

import "./SearchSuggestions.scss";

interface SearchSuggestionsProps {
  onClear: () => void;
}

const MAX_SUGGESTIONS = 5;

export const SearchSuggestions: FC<SearchSuggestionsProps> = ({ onClear }) => {
  const searchQuery = useAppSelector(selectSearchQuery);
  const filteredProducts = useAppSelector(selectFilteredProducts);
  const selectedCategory = useAppSelector(selectCategory);
  const displayedProducts = filteredProducts.slice(0, MAX_SUGGESTIONS);

  if (!searchQuery) return null;

  if (!filteredProducts?.length) {
    return (
      <div className="search-suggestions">
        <p className="search-suggestions__not-found">
          Nothing was found for your query. Please refine your search.
        </p>
      </div>
    );
  }

  return (
    <ul className="search-suggestions">
      {displayedProducts.map((product) => (
        <li className="search-suggestions__item" key={product.id}>
          <Link
            to={`${ROUTE_PATHS.PRODUCTS}/${product.title}`}
            onClick={onClear}
          >
            <p className="search-suggestions__text">
              <span className="search-suggestions__title"> {product.title} </span>
              {selectedCategory === "All Categories" && (
                <>
                  from
                  <span className="search-suggestions__category"> {product.category} </span>
                </>
              )}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};