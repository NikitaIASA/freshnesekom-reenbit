import { FC, ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

import { useAppDispatch } from "@hooks/useAppDispatch";
import { updateField } from "@store/reducers/cartSlice";
import { ICartFormData } from "@appTypes/cartForm";
import {
  CHECKOUT_NAMES,
  CHECKOUT_LABELS,
  CHECKOUT_PLACEHOLDERS,
} from "@constants/checkoutForm";

import "./AdditionalInfo.scss";

interface AdditionalInfoProps {}

export const AdditionalInfo: FC<AdditionalInfoProps> = () => {
  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    dispatch(updateField({ field: name as keyof ICartFormData, value }));
  };

  return (
    <div className="additional-info">
      <div className="additional-info__title-block">
        <h2 className="additional-info__title">Additional informations</h2>
        <p className="additional-info__details">
          Need something else? We will make it for you!
        </p>
      </div>
      <div className="additional-info__input-group">
        <label className="additional-info__label" htmlFor="additionalInfo">
          {CHECKOUT_LABELS.additionalInfo}
        </label>
        <textarea
          className="additional-info__textarea"
          {...register(CHECKOUT_NAMES.additionalInfo)}
          onChange={handleChange}
          placeholder={CHECKOUT_PLACEHOLDERS.additionalInfo}
        />
        {errors.additionalInfo && (
          <p className="additional-info__error">{`${errors.additionalInfo.message}`}</p>
        )}
      </div>
    </div>
  );
};
