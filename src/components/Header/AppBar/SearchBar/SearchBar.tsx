import { FC, useState, useEffect, useRef } from "react";

import Dropdown from "@components/Dropdown";
import arrow from "@assets/images/arrow-down.svg";
import searchIcon from "@assets/images/search-icon.svg";
import { getCategories } from "@helpers/getCategories";
import { useAppSelector } from "@hooks/useAppSelector";
import { RootState } from "@store/store";

import "./SearchBar.scss";

export const SearchBar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const products = useAppSelector((state: RootState) => state.products.products);
  const categories = getCategories(products);

  const сategoriesList = [
    "All Categories",
    ...categories.map((category) => category.name),

  ];

  const setCategoryHandler = (item: string) => {
    setSelectedCategory(item);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
        />
        <img
          className="search-bar__search-icon"
          src={searchIcon}
          alt="search icon"
        />
      </label>
    </div>
  );
};
