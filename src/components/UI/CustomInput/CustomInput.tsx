import { FC, ChangeEvent } from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

import "./CustomInput.scss";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  isRequired?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

export const CustomInput: FC<InputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,
  onChange,
  register,
  errors,
  isRequired
}) => {
  return (
    <div className="custom-input">
      <label className="custom-input__label" htmlFor={name}>
        {label}
        {isRequired && <span className="custom-input__required-asterisk">*</span>}
      </label>
      <input
        className="custom-input__input"
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        onChange={onChange}
        disabled={disabled}
        autoComplete="off"
      />
      {errors[name] && (
        <p className="custom-input__error">{`${errors[name]?.message}`}</p>
      )}
    </div>
  );
};

export default CustomInput;
