import { FC, useState } from "react";

import arrow from "@assets/images/arrow-down.svg";
import searchIcon from "@assets/images/search-icon.svg";
import { CATEGORIES } from "@constants/categories";
import Dropdown from "@components/Dropdown";

import "./SearchBar.scss";

export const SearchBar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All categories");

  const сategoriesList = [
    "All Categories",
    ...CATEGORIES.map((category) => category.name),
  ];

  const setCategoryHandler = (item: string) => {
    setSelectedCategory(item);
    toggleDropdown();
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="search-bar">
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
          placeholder="Search Products, categories..."
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