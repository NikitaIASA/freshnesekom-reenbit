import { FC, useState } from "react";
import { CATEGORIES } from "@constants/categories";
import Dropdown from "@components/Dropdown";
import "./Navigation.scss";

export const Navigation: FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  return (
    <ul className="navigation">
      {CATEGORIES.map((category) => (
        <li
          key={`nav-${category.name}`}
          className="navigation__item"
          onMouseEnter={() => setActiveCategory(category.name)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <span>{category.name}</span>
          {activeCategory === category.name && (
            <Dropdown items={category.items} onSelect={setActiveBrand}/>
          )}
        </li>
      ))}
    </ul>
  );
};
