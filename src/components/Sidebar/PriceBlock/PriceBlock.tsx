import { FC, useState, useEffect } from "react";
import Slider from "react-slider";

import SidebarSectionTitle from "../SidebarSectionTitle";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { setSelectedPriceRange } from "@store/reducers/productSlice";
import { selectFilteredPriceRange} from "@store/selectors/productSelectors";
// import { debounce } from "@helpers/debounce";
// import { PRICE_SLIDER_DELAY } from "@constants/debounceDelays";

import "./Price.scss";

export const PriceBlock: FC = () => {
  const dispatch = useAppDispatch();
  const [minPrice, maxPrice] = useAppSelector(selectFilteredPriceRange);

  const [values, setValues] = useState<number[]>([minPrice, maxPrice]);
  const [inputValues, setInputValues] = useState<number[]>([minPrice, maxPrice]);

  const [error, setError] = useState<boolean | null>(null);

  useEffect(() => {
    setInputValues([minPrice, maxPrice]);
    setValues([minPrice, maxPrice]);
    dispatch(setSelectedPriceRange([minPrice, maxPrice]));
  }, [minPrice, maxPrice]);

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
      dispatch(setSelectedPriceRange(inputValues));
    }
  }, [inputValues, minPrice, maxPrice]);

  const handleInputChange = (index: number, value: string) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = parseFloat(value);
    setInputValues(newInputValues);
    dispatch(setSelectedPriceRange(inputValues));
  };

  const handleSliderChange = (newValues: number[]) => {
    setValues(newValues);
    setInputValues(newValues);
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
        <label
          className={`price-block__label ${
            error ? "price-block__label_error" : ""
          }`}
        >
          Min
          <input
            type="number"
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
            type="number"
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
