import { FC, useState, useEffect } from "react";
import Slider from "react-slider";

import SidebarSectionTitle from "../SidebarSectionTitle";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { setSelectedPriceRange } from "@store/reducers/productSlice";
import { selectFilteredPriceRange } from "@store/selectors/productSelectors";

import "./Price.scss";

export const PriceBlock: FC = () => {
  const dispatch = useAppDispatch();
  const [minPrice, maxPrice] = useAppSelector(selectFilteredPriceRange);
  const [values, setValues] = useState<number[]>([minPrice, maxPrice]);

  useEffect(() => {
    setValues([minPrice, maxPrice]);
    dispatch(setSelectedPriceRange([minPrice, maxPrice]));
  }, [minPrice, maxPrice, dispatch]);

  const handleSliderChange = (newValues: number | number[]) => {
    if (typeof newValues === "number") {
      return;
    }
    setValues(newValues);
    dispatch(setSelectedPriceRange(newValues));
  };

  const handleInputChange = (index: number, value: string) => {
    const newValues = [...values];
    const intValue = parseFloat(value) || 0;
    newValues[index] = Math.max(minPrice, Math.min(maxPrice, intValue)); 
    setValues(newValues);
    dispatch(setSelectedPriceRange(newValues));
  };

  return (
    <div className="price-block">
      <SidebarSectionTitle title="Price" />
      <Slider
        className="price-block__slider"
        thumbClassName="price-block__thumb"
        trackClassName="price-block__track"
        value={values}
        onChange={handleSliderChange}
        min={minPrice}
        max={maxPrice}
        pearling
      />
      <div className="price-block__inputs">
        <label className="price-block__label">
          Min
          <input
            type="number"
            value={values[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className="price-block__input"
            placeholder={`${minPrice}`}
            min={minPrice}
            max={values[1]} 
          />
        </label>
        <span className="price-block__input-separator">-</span>
        <label className="price-block__label">
          Max
          <input
            type="number"
            value={values[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            className="price-block__input"
            placeholder={`${maxPrice}`}
            min={values[0]} 
            max={maxPrice} 
          />
        </label>
      </div>
    </div>
  );
};
