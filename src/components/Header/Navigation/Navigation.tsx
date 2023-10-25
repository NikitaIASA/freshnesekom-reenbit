import { FC, useState } from "react";

import { useAppSelector } from "@hooks/useAppSelector";
import { RootState } from '@store/store';  
import { getCategories } from '@helpers/getCategories';  
import Dropdown from "@components/Dropdown";

import "./Navigation.scss";

export const Navigation: FC = () => {
  const products = useAppSelector((state: RootState) => state.products.products);
  const categories = getCategories(products);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeBrand, setActiveBrand] = useState<string | null>(null);

  console.log(activeBrand); // temporarily 

  return (
    <ul className="navigation">
      {categories.map((category) => (
        <li
          key={`nav-${category.name}`}
          className="navigation__item"
          onMouseEnter={() => setActiveCategory(category.name)}
          onMouseLeave={() => setActiveCategory(null)}
        >
          <span>{category.name}</span>
          {activeCategory === category.name && (
            <Dropdown items={category.brands} onSelect={setActiveBrand}/>
          )}
        </li>
      ))}
    </ul>
  );
};
