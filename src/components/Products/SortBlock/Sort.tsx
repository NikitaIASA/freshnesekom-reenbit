import { FC, useState, useRef} from "react";

import { useAppDispatch } from "@hooks/useAppDispatch";

import SortOptions from "./SortOptions";
import { setSortBy } from "@store/reducers/productSlice";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import arrow from "@assets/images/arrow-down.svg";

import "./Sort.scss";

type SortItem = {
  sortName: string;
  sortKey: string;
};

const sortItems: SortItem[] = [
  { sortName: "Default", sortKey: "default" },
  { sortName: "Price: Low to High", sortKey: "price_asc" },
  { sortName: "Price: High to Low", sortKey: "price_desc" },
  { sortName: "Rating: Low to High", sortKey: "rating_asc" },
  { sortName: "Rating: High to Low", sortKey: "rating_desc" },
  { sortName: "Name: A to Z", sortKey: "rating_asc" },
  { sortName: "Name: Z to A", sortKey: "rating_desc" },
];

export const SortBlock: FC = () => {
  const dispatch = useAppDispatch();
  const [selectedSort, setSelectedSort] = useState(sortItems[0].sortName);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (sortName: string) => {
    const sortItem = sortItems.find((item) => item.sortName === sortName);
    if (sortItem) {
      setSelectedSort(sortName);
      dispatch(setSortBy(sortItem.sortKey));
      setIsOpen(false); 
    }
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => setIsOpen(false));

  return (
    <div className="sort-block" ref={dropdownRef}>
      <div className="sort-block__button" onClick={() => setIsOpen(!isOpen)}>
        <span>Sort by</span>
        <span className="sort-block__divider">|</span>
        <div className="sort-block__text-container">
          <p className="sort-block__text">{selectedSort}</p>
          <img className="sort-dropdown__arrow" src={arrow} alt="arrow" />
          {isOpen && (
            <SortOptions
              items={sortItems.map((item) => item.sortName)}
              onSelect={handleSelect}
            />
          )}
        </div>
      </div>
    </div>
  );
};
