import { FC, useState, useRef, ChangeEvent } from "react";
import { useDispatch } from "react-redux";
import { handleKeyDown } from "@helpers/handleKeyDown";
import { changeItemQuantity, changeItemUnit } from "@store/reducers/cartSlice";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { BOX, BOX_ITEMS } from "@constants/productUnits";
import { MIN_QUANTITY, STEP_QUANTITY } from "@constants/priceValidation";

import arrowDown from "@assets/images/arrow-down.svg";

import "./QuantityInput.scss";

interface Item {
  id: string;
  quantity: number;
  unit: string;
}

interface QuantityInputProps {
  item: Item;
  units: string[];
  stock: number;
}

export const QuantityInput: FC<QuantityInputProps> = ({
  item,
  units,
  stock,
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [unit, setUnit] = useState<string>(item.unit);

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    const maxAllowed = unit === BOX ? Math.floor(stock / BOX_ITEMS) : stock;

    if (newQuantity > maxAllowed) {
      setQuantity(maxAllowed);
      dispatch(
        changeItemQuantity({
          id: item.id,
          unit: item.unit,
          newQuantity: maxAllowed,
        })
      );
    } else {
      setQuantity(newQuantity);
      dispatch(
        changeItemQuantity({ id: item.id, unit: item.unit, newQuantity })
      );
    }
  };

  const handleBlur = () => {
    if (!quantity) {
      setQuantity(1);
      dispatch(changeItemQuantity({ id: item.id, unit: item.unit, newQuantity: 1 }));
    }
  };

  const handleUnitSelect = (newUnit: string) => {
    setUnit(newUnit);
    setIsDropdownOpen(false);
    dispatch(changeItemUnit({ id: item.id, newUnit }));
  };

  return (
    <div className="quantity-input">
      <input
        className="quantity-input__input"
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        min={MIN_QUANTITY}
        step={STEP_QUANTITY}
        placeholder="0"
      />
      {units && (
        <div
          className="quantity-input__dropdown"
          ref={dropdownRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {unit}
          <img
            className="quantity-input__arrow"
            src={arrowDown}
            alt="arrow down"
          />
          {isDropdownOpen && (
            <ul className="quantity-input__dropdown-list">
              {units.map((u) => (
                <li
                  className="quantity-input__dropdown-item"
                  key={`unit-${u}`}
                  onClick={() => handleUnitSelect(u)}
                >
                  {u}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
