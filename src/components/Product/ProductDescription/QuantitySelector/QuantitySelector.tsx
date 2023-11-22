import { FC, useState, useRef, ChangeEvent } from "react";

import { useOnClickOutside } from "@hooks/useOnClickOutside";
import arrowDown from "@assets/images/arrow-down.svg";

import "./QuantitySelector.scss";

interface QuantitySelectorProps {
  initialQuantity?: number;
  units: string[];
  maxQuantity: number;
  onQuantityChange: (quantity: number, unit: string) => void;
  setError: (error: string | null) => void;
}

const QuantitySelector: FC<QuantitySelectorProps> = ({
  initialQuantity = 1,
  units,
  maxQuantity,
  onQuantityChange,
  setError,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [quantity, setQuantity] = useState<string>(initialQuantity.toString());
  const [selectedUnit, setSelectedUnit] = useState<string>(units[0]);

  const validateQuantity = (qty: number): boolean => {
    if (qty < 1) {
      setError(`Product sold in quantities of at least 1`);
      return false;
    } else if (qty > maxQuantity) {
      setError(`Max Product quantity: ${maxQuantity}.`);
      return false;
    } else {
      setError(null);
      return true;
    }
  };

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuantityValue = event.target.value;
    setQuantity(newQuantityValue);

    const newQuantity = parseInt(newQuantityValue, 10);
    if (validateQuantity(newQuantity)) {
      onQuantityChange(newQuantity, selectedUnit);
    }
  };

  const handleUnitSelect = (unit: string) => {
    setSelectedUnit(unit);
    setIsDropdownOpen(false);
    if (validateQuantity(+quantity)) {
      onQuantityChange(+quantity, unit);
    }
  };

  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <div className="quantity-selector">
      <input
        className="quantity-selector__input"
        type="number"
        value={quantity}
        onChange={handleQuantityChange}
        min="1"
        placeholder="0"
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
                <li key={unit} onClick={() => handleUnitSelect(unit)}>
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
