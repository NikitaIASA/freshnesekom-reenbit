import { FC } from "react";

import CustomCheckbox from "../CustomCheckbox";
import SidebarSkeleton from "../SidebarSkeleton";
import SidebarSectionTitle from "../SidebarSectionTitle";
import { useBrandsForSelectedCategory } from "@hooks/useBrandsForSelectedCategory";
import { selectProductsState } from "@store/selectors/productSelectors";
import { useAppSelector } from "@hooks/useAppSelector";
import { STATUSES } from "@constants/statuses";
import "./Brands.scss";

export const Brands: FC = () => {
  const brandsForSelectedCategory = useBrandsForSelectedCategory();
  const { status } = useAppSelector(selectProductsState);

  return (
    <div className="brands">
      <SidebarSectionTitle title="Brands" />
      {status === STATUSES.LOADING ? (
        <SidebarSkeleton />
      ) : (
        <ul className="brands__list">
          {brandsForSelectedCategory.map((brand) => (
            <li className="brands__item" key={`brand-${brand}`}>
              <CustomCheckbox isChecked={false} />
              <p className="brands__title">{brand}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
