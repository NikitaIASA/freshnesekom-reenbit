import { FC } from "react";
import { useFormContext } from "react-hook-form";

import "./AdditionalInfo.scss";

interface AdditionalInfoProps {}

export const AdditionalInfo: FC<AdditionalInfoProps> = () => {
  const {register, formState: { errors } } = useFormContext();

  return (
    <div className="additional-info">
      <div className="additional-info__title-block">
        <h2 className="additional-info__title">Additional informations</h2>
        <p className="additional-info__details">Need something else? We will make it for you!</p>
      </div>
      <div className="additional-info__input-group">
        <label className="additional-info__label" htmlFor="additionalInfo">
          Order notes
        </label>
        <textarea
          className="additional-info__textarea"
          id="additionalInfo"
          {...register("additionalInfo")}
          placeholder="Need a specific delivery day? Sending a gitf? Let’s say ..."
        />
        {errors.additionalInfo && <p className="additional-info__error">{`${errors.additionalInfo.message}`}</p>}
      </div>
    </div>
  );
};
