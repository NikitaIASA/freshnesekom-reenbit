import React, { ChangeEvent } from "react";

import checkedMark from "@assets/images/checked-mark.svg";
import uncheckedMark from "@assets/images/unchecked-mark.svg";

import "./CustomCheckbox.scss";

interface CustomCheckboxProps {
  isChecked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  isChecked,
  onChange,
}) => {
  return (
    <label className="customCheckbox__label">
      <input
        type="checkbox"
        className="customCheckbox__input"
        checked={isChecked}
        onChange={onChange}
      />
      <img
        className="customCheckbox__icon"
        src={isChecked ? checkedMark : uncheckedMark}
        alt="checkbox"
      />
    </label>
  );
};
