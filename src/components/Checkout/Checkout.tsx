import { FC, useState } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppSelector } from "@hooks/useAppSelector";
import CreateCartSchema from "@schemas/cartSchema";
import BillingInfo from "./BillingInfo";
import AdditionalInfo from "./AdditionalInfo";
import ConfirmationBlock from "./ConfirmationBlock";
import CustomButton from "@components/UI/CustomButton";
import { ButtonSizes, ButtonTypes } from "@appTypes/buttonTypes";
import {
  selectAutoCompleteCities,
  selectAutoCompleteCountries,
} from "@store/selectors/locationAutoCompleteSelectors";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { resetCartForm } from "@store/reducers/cartSlice";
import FormSuccessMessage from "./FormSuccessMessage";
import { DEFAULT_CART_FORM } from "@constants/defaultCartForm";
import { ICartFormData } from "@appTypes/cartForm";
import { selectCartFormData } from "@store/selectors/cartSelectors";

import "./Checkout.scss";

export const Checkout: FC = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAutoCompleteCountries);
  const cities = useAppSelector(selectAutoCompleteCities);
  const cartData = useAppSelector(selectCartFormData);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const cartSchema = CreateCartSchema(countries, cities);

  const methods = useForm<ICartFormData>({
    resolver: yupResolver(cartSchema),
    mode: "all",
    defaultValues: cartData || DEFAULT_CART_FORM,
  });

  const onSubmit: SubmitHandler<ICartFormData> = () => {
    dispatch(resetCartForm());
    methods.reset(DEFAULT_CART_FORM);
    setIsSubmittedSuccessfully(true);
  };

  if (isSubmittedSuccessfully) {
    return <FormSuccessMessage />;
  }

  return (
    <div className="checkout">
      <div className="checkout__left-side">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <BillingInfo />
            <AdditionalInfo />
            <ConfirmationBlock />
            <CustomButton
              size={ButtonSizes.MEDIUM}
              className="checkout__button"
              type={ButtonTypes.SUBMIT}
            >
              Complete order
            </CustomButton>
          </form>
        </FormProvider>
      </div>
      <div className="checkout__right-side"></div>
    </div>
  );
};
