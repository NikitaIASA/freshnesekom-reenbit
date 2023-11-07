import { FC, useState, useEffect, useCallback } from "react";
import Slider from "react-slider";

import SidebarSectionTitle from "../SidebarSectionTitle";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { setSelectedPriceRange } from "@store/reducers/productSlice";
import { selectFilteredPriceRange } from "@store/selectors/productSelectors";
import { debounce } from "@helpers/debounce";
import { PRICE_SLIDER_DELAY } from "@constants/debounceDelays";

import "./Price.scss";

export const PriceBlock: FC = () => {
  const dispatch = useAppDispatch();
  const [minPrice, maxPrice] = useAppSelector(selectFilteredPriceRange);
  const [values, setValues] = useState<number[]>([minPrice, maxPrice]);
  const [inputValues, setInputValues] = useState<number[]>([
    minPrice,
    maxPrice,
  ]);
  const [error, setError] = useState<boolean | null>(null);

  const debounceSetValue = useCallback(
    debounce((newValues: number[]) => {
      dispatch(setSelectedPriceRange(newValues));
    }, PRICE_SLIDER_DELAY),
    []
  );

  useEffect(() => {
    setInputValues([minPrice, maxPrice]);
    setValues([minPrice, maxPrice]);
    debounceSetValue([minPrice, maxPrice]);
  }, [minPrice, maxPrice, debounceSetValue]);

  useEffect(() => {
    const [minInputValue, maxInputValue] = inputValues;
    if (
      minInputValue < minPrice ||
      maxInputValue > maxPrice ||
      minInputValue > maxInputValue
    ) {
      setError(true);
    } else {
      setError(null);
      setValues(inputValues);
      debounceSetValue(inputValues);
    }
  }, [inputValues, minPrice, maxPrice, debounceSetValue]);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = parseFloat(value);
    setInputValues(newInputValues);
  };

  const handleSliderChange = (newValues: number[]) => {
    setValues(newValues);
    setInputValues(newValues);
    debounceSetValue(newValues);
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
        <label
          className={`price-block__label ${
            error ? "price-block__label--error" : ""
          }`}
        >
          Min
          <input
            type="number"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className={`price-block__input ${
              error ? "price-block__input--error" : ""
            }`}
            placeholder={`${minPrice}`}
          />
        </label>
        <span className="price-block__input-separator">-</span>
        <label
          className={`price-block__label ${
            error ? "price-block__label--error" : ""
          }`}
        >
          Max
          <input
            type="number"
            value={inputValues[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            className={`price-block__input ${
              error ? "price-block__input--error" : ""
            }`}
            placeholder={`${maxPrice}`}
          />
        </label>
      </div>
    </div>
  );
};
