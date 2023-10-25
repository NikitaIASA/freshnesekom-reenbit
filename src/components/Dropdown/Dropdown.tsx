import { FC } from "react";

import "./Dropdown.scss";

interface DropdownProps {
  items: string[];
  onSelect: (item: string) => void;
}

export const Dropdown: FC<DropdownProps> = ({ items, onSelect }) => (
  <ul className="dropdown">
    {items.map((item) => (
      <li
        key={`drop-${item}`}
        className="dropdown__item"
        onClick={() => onSelect(item)}
      >
        {item}
      </li>
    ))}
  </ul>
);
