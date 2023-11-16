import { FC, useState, useRef, useEffect} from "react";

import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import SortOptions from "./SortOptions";
import { resetPage, setSortBy } from "@store/reducers/productSlice";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { sortItems} from "@constants/sortOptions";
import { selectSortBy } from "@store/selectors/sortSelectors";

import arrow from "@assets/images/arrow-down.svg";

import "./Sort.scss";

export const SortBlock: FC = () => {
  const dispatch = useAppDispatch();
  const selectedSortOption = useAppSelector(selectSortBy)
  const [selectedSort, setSelectedSort] = useState(selectedSortOption);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const sortItem = sortItems.find(item => item.sortKey === selectedSortOption);
    if (sortItem) {
      setSelectedSort(sortItem.sortName);
    }
  }, [selectedSortOption]);

  const handleSelect = (sortName: string) => {
    const sortItem = sortItems.find((item) => item.sortName === sortName);
    if (sortItem) {
      setSelectedSort(sortName);
      dispatch(setSortBy(sortItem.sortKey));
      setIsOpen(false); 
      dispatch(resetPage());
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
