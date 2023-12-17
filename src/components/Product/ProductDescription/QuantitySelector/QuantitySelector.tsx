import { FC, useState, useRef, ChangeEvent, useEffect } from "react";

import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { handleKeyDown } from "@helpers/handleKeyDown";
import { MIN_QUANTITY, INITIAL_QUANTITY, STEP_QUANTITY, DECIMAL_BASE } from "@constants/priceValidation";
import arrowDown from "@assets/images/arrow-down.svg";

import "./QuantitySelector.scss";

interface QuantitySelectorProps {
  units: string[];
  maxQuantity: number;
  onQuantityChange: (quantity: number, unit: string) => number;
  setError: (error: string | null) => void;
  selectedUnit: string;
  setSelectedUnit: (unit: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const QuantitySelector: FC<QuantitySelectorProps> = ({
  units,
  maxQuantity,
  onQuantityChange,
  setError,
  selectedUnit,
  setSelectedUnit,
  quantity,
  setQuantity,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const validateQuantity = (qty: number) => {
    if (qty < 1 || isNaN(qty)) {
      setError(`Product sold in quantities of at least 1 ${units[0]}`);
      onQuantityChange(0, selectedUnit);
    } else if (qty > maxQuantity) {
      setError(`Max Product quantity: ${maxQuantity} ${units[0]}`);
      onQuantityChange(0, selectedUnit);
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    const actualQuantity = onQuantityChange(quantity, selectedUnit);
    validateQuantity(actualQuantity);
  }, [quantity, selectedUnit, onQuantityChange]);

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(event.target.value, DECIMAL_BASE);
    setQuantity(newQuantity);
  };

  const handleUnitSelect = (unit: string) => {
    setSelectedUnit(unit);
    setIsDropdownOpen(false);
  };

  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <div className="quantity-selector">
      <input
        className="quantity-selector__input"
        type="number"
        onKeyDown={handleKeyDown}
        value={quantity || ""}
        onChange={handleQuantityChange}
        min={MIN_QUANTITY}
        step={STEP_QUANTITY}
        placeholder={INITIAL_QUANTITY.toString()}
      />
      {units && (
        <div
          className="quantity-selector__dropdown"
          ref={dropdownRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedUnit}
          <img
            className="quantity-selector__arrow"
            src={arrowDown}
            alt="arrow down"
          />
          {isDropdownOpen && (
            <ul className="quantity-selector__dropdown-list">
              {units.map((unit) => (
                <li className="quantity-selector__dropdown-item" key={`unit-${unit}`} onClick={() => handleUnitSelect(unit)}>
                  {unit}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default QuantitySelector;
