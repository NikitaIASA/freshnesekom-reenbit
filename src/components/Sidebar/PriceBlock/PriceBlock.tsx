import { FC, useState, useEffect, useCallback } from "react";
import Slider from "react-slider";

import SidebarSectionTitle from "../SidebarSectionTitle";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { setSelectedPriceRange } from "@store/reducers/productSlice";
import {
  selectFilteredPriceRange,
  selectPriceRange,
} from "@store/selectors/productSelectors";
import { debounce } from "@helpers/debounce";
import { PRICE_SLIDER_DELAY } from "@constants/debounceDelays";

import "./PriceBlock.scss";

export const PriceBlock: FC = () => {
  const dispatch = useAppDispatch();
  const [minPrice, maxPrice] = useAppSelector(selectFilteredPriceRange);
  const [selectedMinPrice, selectedMaxPrice] = useAppSelector(selectPriceRange);
  const [values, setValues] = useState<number[]>([0, 0]);
  const [inputValues, setInputValues] = useState<number[]>([0, 0]);
  const [error, setError] = useState<boolean | null>(null);

  const debouncedSetSelectedPriceRange = useCallback(
    debounce((newValues: number[]) => {
      dispatch(setSelectedPriceRange(newValues));
    }, PRICE_SLIDER_DELAY),
    [dispatch]
  );

  useEffect(() => {
    dispatch(setSelectedPriceRange([minPrice, maxPrice]));
  }, [minPrice, maxPrice]);

  useEffect(() => {
    if (
      //means reset
      selectedMinPrice === minPrice &&
      selectedMaxPrice === maxPrice
    ) {
      setInputValues([selectedMinPrice, selectedMaxPrice]);
      setValues([selectedMinPrice, selectedMaxPrice]);
    }
  }, [selectedMinPrice, selectedMaxPrice]);

  const handleInputChange = (index: number, value: string) => {
    const parsedValue = parseFloat(value);
    const newInputValues = [...inputValues];
    newInputValues[index] = isNaN(parsedValue) ? 0 : parsedValue;

    setInputValues(newInputValues);
    setValues(newInputValues);

    dispatch(setSelectedPriceRange(newInputValues));
  };

  useEffect(() => {
    const isInvalid =
      inputValues[0] > inputValues[1] ||
      inputValues[0] < minPrice ||
      inputValues[1] > maxPrice;

    setError(isInvalid);
  }, [inputValues, minPrice, maxPrice]);

  const handleSliderChange = (newValues: number[]) => {
    setValues(newValues);
    setInputValues(newValues);
    setError(false);
    debouncedSetSelectedPriceRange(newValues);
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
            error ? "price-block__label_error" : ""
          }`}
        >
          Min
          <input
            type="text"
            value={inputValues[0]}
            onChange={(e) => handleInputChange(0, e.target.value)}
            className={`price-block__input ${
              error ? "price-block__input_error" : ""
            }`}
            placeholder={`${minPrice}`}
          />
        </label>
        <span className="price-block__input-separator">-</span>
        <label
          className={`price-block__label ${
            error ? "price-block__label_error" : ""
          }`}
        >
          Max
          <input
            type="text"
            value={inputValues[1]}
            onChange={(e) => handleInputChange(1, e.target.value)}
            className={`price-block__input ${
              error ? "price-block__input_error" : ""
            }`}
            placeholder={`${maxPrice}`}
          />
        </label>
      </div>
    </div>
  );
};
