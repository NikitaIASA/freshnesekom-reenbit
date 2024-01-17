import { FC, useState, useRef, ChangeEvent, useEffect } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { handleKeyDown } from "@helpers/handleKeyDown";
import { changeItemQuantity, changeItemUnit } from "@store/reducers/cartSlice";
import { useOnClickOutside } from "@hooks/useOnClickOutside";
import { BOX, BOX_ITEMS } from "@constants/productUnits";
import { MIN_QUANTITY, STEP_QUANTITY } from "@constants/priceValidation";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectCartItems } from "@store/selectors/cartSelectors";
import { getValidUnitForm } from "@helpers/getValidUnitForm";
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

const DECIMAL_BASE = 10;

export const QuantityInput: FC<QuantityInputProps> = ({
  item,
  units,
  stock,
}) => {
  const dispatch = useDispatch();
  const itemsInCart = useAppSelector(selectCartItems);
  const [quantity, setQuantity] = useState<number>(item.quantity);
  const [unit, setUnit] = useState<string>(item.unit);
  const inputQuantityValue = quantity ? quantity.toString() : "";

  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  const cartItemsForProduct = itemsInCart.filter(
    (item) => item.id === item?.id
  );

  useEffect(() => {
    const currentCartItem = itemsInCart.find(cartItem => cartItem.id === item.id && cartItem.unit === item.unit);
    if (currentCartItem) {
      setQuantity(currentCartItem.quantity);
      setUnit(currentCartItem.unit);
    }
  }, [itemsInCart, item.id, item.unit]);

  const calculateMaxAllowed = () => {
    const currentQuantityInCart = cartItemsForProduct.reduce((acc, cartItem) => {
        if (cartItem.id === item.id && cartItem.unit !== item.unit) {
          const quantityInBaseUnit =  cartItem.unit === BOX ? cartItem.quantity * BOX_ITEMS : cartItem.quantity;
          return acc + quantityInBaseUnit;
        }
        return acc;
      },
      0
    );

    return unit === BOX
      ? Math.floor((stock - currentQuantityInCart) / BOX_ITEMS)
      : stock - currentQuantityInCart;
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, DECIMAL_BASE);
    const maxAllowed = calculateMaxAllowed();

    if (newQuantity > maxAllowed) {
      setQuantity(maxAllowed);
      dispatch(
        changeItemQuantity({
          id: item.id,
          unit: item.unit,
          newQuantity: maxAllowed,
        })
      );
      const maxUnit = getValidUnitForm(maxAllowed, unit);
      toast.error(`Max allowed: ${maxAllowed} ${maxUnit}`);
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
      dispatch(
        changeItemQuantity({ id: item.id, unit: item.unit, newQuantity: 1 })
      );
    }
  };

  const handleUnitSelect = (newUnit: string) => {
    setIsDropdownOpen(false);
    dispatch(changeItemUnit({ id: item.id, newUnit, stock }));
  };

  return (
    <div className="quantity-input">
      <input
        className="quantity-input__input"
        type="number"
        value={inputQuantityValue}
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
