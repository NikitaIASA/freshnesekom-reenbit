import {
  FC,
  useState,
  useEffect,
  useRef,
  useCallback,
  ChangeEvent,
} from "react";

import Dropdown from "@components/Dropdown";
import { getCategories } from "@helpers/getCategories";
import { useAppSelector } from "@hooks/useAppSelector";
import { useAppDispatch } from "@hooks/useAppDispatch";
import {
  setSearchQuery,
  setSelectedBrand,
  setSelectedCategory,
} from "@store/reducers/productSlice";
import { debounce } from "@helpers/debounce";
import { SEARCH_DELAY } from "@constants/debounceDelays";
import {
  selectProducts,
  selectCategory,
} from "@store/selectors/productSelectors";
import { useLocation } from "react-router-dom";
import SearchSuggestions from "../SearchSuggestion";
import arrow from "@assets/images/arrow-down.svg";
import searchIcon from "@assets/images/search-icon.svg";
import clearIcon from "@assets/images/clear-icon.svg";

import "./SearchBar.scss";

export const SearchBar: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const products = useAppSelector(selectProducts);
  const selectedCategory = useAppSelector(selectCategory);
  const categories = getCategories(products);
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const [isInputFocused, setInputFocused] = useState(false);
  const blurTimer = useRef<NodeJS.Timeout | null>(null);
  const FOCUS_DELAY = 100;

  // Adding a short delay to click on the list before focus is lost
  const handleInputBlur = () => {
    blurTimer.current = setTimeout(() => {
      setInputFocused(false);
    }, FOCUS_DELAY);
  };

  const handleInputFocus = () => {
    if (blurTimer.current) {
      clearTimeout(blurTimer.current);
      blurTimer.current = null;
    }
    setInputFocused(true);
  };

  useEffect(() => {
    return () => {
      if (blurTimer.current) {
        clearTimeout(blurTimer.current);
      }
    };
  }, []);

  const сategoriesList = [
    "All Categories",
    ...categories.map((category) => category.name),
  ];

  const debouncedUpdateSearchQuery = useCallback(
    debounce((value: string) => {
      dispatch(setSearchQuery(value));
    }, SEARCH_DELAY),
    []
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    debouncedUpdateSearchQuery(value);
  };

  const setCategoryHandler = (item: string) => {
    dispatch(setSelectedCategory(item));
    dispatch(setSelectedBrand(""));
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClearInput = () => {
    setLocalSearchQuery("");
    debouncedUpdateSearchQuery("");
  };

  // Effect to add an event listener to close the dropdown when clicked outside its area
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="search-bar" ref={dropdownRef}>
      <div className="search-bar__dropdown" onClick={toggleDropdown}>
        <span className="search-bar__text">{selectedCategory}</span>
        <img className="search-bar__arrow" src={arrow} alt="arrow" />
      </div>
      {isOpen && (
        <Dropdown items={сategoriesList} onSelect={setCategoryHandler} />
      )}
      <div className="search-bar__divider"></div>
      <label htmlFor="search" className="search-bar__label">
        <input
          id="search"
          type="text"
          placeholder="Search products..."
          autoComplete="off"
          className="search-bar__input"
          value={localSearchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <img
          className="search-bar__search-icon"
          src={localSearchQuery ? clearIcon : searchIcon}
          alt="search icon"
          onClick={localSearchQuery ? handleClearInput : undefined}
        />
      </label>
      {location.pathname !== "/products" && isInputFocused && (
        <SearchSuggestions onClear={handleClearInput} />
      )}
    </div>
  );
};
