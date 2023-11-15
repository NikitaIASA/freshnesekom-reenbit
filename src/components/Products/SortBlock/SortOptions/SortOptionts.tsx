import { FC } from "react";

import "./SortOptions.scss";

interface SortOptionsProps {
  items: string[];
  onSelect: (item: string) => void;
}

export const SortOptions: FC<SortOptionsProps> = ({ items, onSelect }) => (
  <ul className="sort-options">
    {items.map((item) => (
      <li
        key={`sort-options-${item}`}
        className="sort-options__item"
        onClick={() => onSelect(item)}
      >
        {item}
      </li>
    ))}
  </ul>
);
