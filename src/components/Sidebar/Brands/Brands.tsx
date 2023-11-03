import { FC } from "react";

import CustomCheckbox from "../CustomCheckbox";
import { useBrandsForSelectedCategory } from "@hooks/useBrandsForSelectedCategory"; 

import "./Brands.scss";

export const Brands: FC = () => {
  const brandsForSelectedCategory = useBrandsForSelectedCategory();

  return (
    <div className="brands">
      <h2 className="brands__title">Brands</h2>
      <ul className="brands__list">
        {brandsForSelectedCategory.map((brand) => (
          <li className="brands__item" key={`brand-${brand}`}>
            <CustomCheckbox isChecked={false} />
            <p className="brands__item">{brand}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
