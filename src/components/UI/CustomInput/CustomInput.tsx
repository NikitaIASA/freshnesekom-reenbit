import { FC, ChangeEvent, FocusEvent } from "react";
import { UseFormRegister, FieldErrors, FieldValues } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: () => void;
  onBlur?: () => void;
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
  onBlur,
  register,
  errors,
}) => {
  return (
    <div className="billing-info__input-group">
      <label className="billing-info__label" htmlFor={name}>
        {label}
      </label>
      <input
        className="billing-info__input"
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name)}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      />
      {errors[name] && (
        <p className="billing-info__error">{`${errors[name]?.message}`}</p>
      )}
    </div>
  );
};

export default CustomInput;
