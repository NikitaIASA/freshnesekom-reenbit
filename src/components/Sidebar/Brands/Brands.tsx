import { FC, ChangeEvent} from "react";

import CustomCheckbox from "../CustomCheckbox";
import SidebarSkeleton from "../SidebarSkeleton";
import SidebarSectionTitle from "../SidebarSectionTitle";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useBrandsForSelectedCategory } from "@hooks/useBrandsForSelectedCategory";
import { selectProductsState } from "@store/selectors/productSelectors";
import { useAppSelector } from "@hooks/useAppSelector";
import { STATUSES } from "@constants/statuses";
import { toggleBrand } from "@store/reducers/productSlice"; 

import "./Brands.scss";

export const Brands: FC = () => {
  const dispatch = useAppDispatch(); 
  const brandsForSelectedCategory = useBrandsForSelectedCategory();
  const { selectedBrands, status } = useAppSelector(selectProductsState);

  const handleBrandToggle = (brand: string) => {
    dispatch(toggleBrand(brand));
  };

  const handleBrandChange = (event: ChangeEvent<HTMLInputElement>, brand: string) => {
    event.stopPropagation();
    handleBrandToggle(brand);
  };

  return (
    <div className="brands">
      <SidebarSectionTitle title="Brands" />
      {status === STATUSES.LOADING ? (
        <SidebarSkeleton />
      ) : (
        <ul className="brands__list">
          {brandsForSelectedCategory.map((brand) => (
            <li className="brands__item" key={`brand-${brand}`} onClick={() => handleBrandToggle(brand)}>
              <CustomCheckbox
                isChecked={selectedBrands.includes(brand)}
                onChange={(event) => handleBrandChange(event, brand)}
              />
              <p className="brands__item-name">{brand}</p> 
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
