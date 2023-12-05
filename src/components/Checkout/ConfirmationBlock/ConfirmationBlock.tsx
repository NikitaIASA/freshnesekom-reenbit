import { FC } from "react";
import { useFormContext } from "react-hook-form";

import checkedMark from "@assets/images/checked-mark.svg";
import uncheckedMark from "@assets/images/unchecked-mark.svg";

import "./ConfirmationBlock.scss";

export const ConfirmationBlock: FC = () => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const agreeToMarketing = watch("agreeToMarketing");
  const agreeToTermsAndPrivacy = watch("agreeToTermsAndPrivacy");

  return (
    <div className="confirmation-block">
      <div className="confirmation__title-block">
        <h2 className="confirmation-block__title">Confirmation</h2>
        <p className="confirmation-block__details">
          We are getting to the end. Just few clicks and your order si ready!
        </p>
      </div>

      <div className="confirmation-block__agreement-fields">
        <label className="confirmation-block__agreement-item">
          <input
            type="checkbox"
            className="customCheckbox__input"
            checked={agreeToMarketing}
            {...register("agreeToMarketing")}
          />
          <img
            className="customCheckbox__icon"
            src={agreeToMarketing ? checkedMark : uncheckedMark}
            alt="checkbox"
          />
          <p>
            I agree with sending an Marketing and newsletter emails. No spam,
            promissed!
          </p>
          {errors.agreeToMarketing && (
            <p className="confirmation-block__error">{`${errors.agreeToMarketing.message}`}</p>
          )}
        </label>

        <label className="confirmation-block__agreement-item">
          <input
            type="checkbox"
            className="customCheckbox__input"
            checked={agreeToTermsAndPrivacy}
            {...register("agreeToTermsAndPrivacy")}
          />
          <img
            className="customCheckbox__icon"
            src={agreeToTermsAndPrivacy ? checkedMark : uncheckedMark}
            alt="checkbox"
          />
          <p>I agree with our terms and conditions and privacy policy.</p>
          {errors.agreeToTermsAndPrivacy && (
            <p className="confirmation-block__error">{`${errors.agreeToTermsAndPrivacy.message}`}</p>
          )}
        </label>
      </div>
    </div>
  );
};
