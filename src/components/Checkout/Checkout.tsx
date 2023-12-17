import { FC, useState, useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppSelector } from "@hooks/useAppSelector";
import CreateCartSchema from "@schemas/cartSchema";
import BillingInfo from "./BillingInfo";
import AdditionalInfo from "./AdditionalInfo";
import ConfirmationBlock from "./ConfirmationBlock";
import Cart from "./Cart";
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
import { selectCartFormData, selectCartItems } from "@store/selectors/cartSelectors";
import { CHECKOUT_NAMES } from "@constants/checkoutForm";

import "./Checkout.scss";

export const Checkout: FC = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAutoCompleteCountries);
  const cities = useAppSelector(selectAutoCompleteCities);
  const cartProducts = useAppSelector(selectCartItems);

  const cartData = useAppSelector(selectCartFormData);
  const [isSubmittedSuccessfully, setIsSubmittedSuccessfully] = useState(false);
  const cartSchema = CreateCartSchema(countries, cities);

  const methods = useForm<ICartFormData>({
    resolver: yupResolver(cartSchema),
    mode: "all",
    defaultValues: cartData || DEFAULT_CART_FORM,
  });

  const { handleSubmit, formState: { isValid }, reset, trigger, getValues  } = methods;

  /*Triggering validation of fields when loading the page. 
  The check is carried out for non-empty fields and under the condition 
  that countries and cities are loaded
*/
  useEffect(() => {
    const values = getValues();
    const fieldsToValidate: (keyof ICartFormData)[] = [];
  
    Object.keys(values).forEach((key) => {
      const typedKey = key as keyof ICartFormData; 
  
      if (values[typedKey]) {
        if (typedKey === CHECKOUT_NAMES.country && countries.length > 0) {
          fieldsToValidate.push(typedKey);
        } else if (typedKey === CHECKOUT_NAMES.city && cities.length > 0) {
          fieldsToValidate.push(typedKey);
        } else if (typedKey !== CHECKOUT_NAMES.country && typedKey !== CHECKOUT_NAMES.city) {
          fieldsToValidate.push(typedKey);
        }
      }
    });
  
    if (fieldsToValidate.length > 0) {
      trigger(fieldsToValidate);
    }
  }, [countries, cities, trigger, getValues]);


  const onSubmit: SubmitHandler<ICartFormData> = () => {
    dispatch(resetCartForm());
    reset(DEFAULT_CART_FORM);
    setIsSubmittedSuccessfully(true);
  };

  if (isSubmittedSuccessfully) {
    return <FormSuccessMessage />;
  }

  return (
    <div className="checkout">
      <div className="checkout__left-side">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <BillingInfo />
            <AdditionalInfo />
            <ConfirmationBlock />
            <CustomButton
              size={ButtonSizes.MEDIUM}
              className="checkout__button"
              type={ButtonTypes.SUBMIT}
              isDisabled={!isValid || !cartProducts.length}
            >
              Complete order
            </CustomButton>
          </form>
        </FormProvider>
      </div>
      <div className="checkout__right-side">
        <Cart/>
      </div>
    </div>
  );
};