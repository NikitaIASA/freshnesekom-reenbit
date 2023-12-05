import { FC } from "react";

import "./LocationSuggestion.scss";

interface LocationSuggestionProps {
  items: string[];
  onSelect: (item: string) => void;
}

export const LocationSuggestion: FC<LocationSuggestionProps> = ({
  items,
  onSelect,
}) => {
  return (
    <ul className="location-suggestion">
      {items.map((item) => (
        <li
          className="location-suggestion__item"
          onClick={() => onSelect(item)}
          key={`item-${item}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
