import { FC } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RootState } from "@store/store";

import { useAppSelector } from "@hooks/useAppSelector";
import CreateCartSchema from "../../schemas/cartSchema";
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
import { useNavigate } from "react-router-dom";

import "./Checkout.scss";

interface IFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  city: string;
  zip: string;
}

export const Checkout: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAutoCompleteCountries);
  const cities = useAppSelector(selectAutoCompleteCities);
  const cartSchema = CreateCartSchema(countries, cities);
  const cartData = useAppSelector(
    (state: RootState) => state.cart.CartFormData
  );

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    city: "",
    zip: "",
  };

  const methods = useForm<IFormInput>({
    resolver: yupResolver(cartSchema),
    mode: "all",
    defaultValues: cartData || defaultValues,
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    alert(
      "(TEST ALERT) Your form is successfully sent. You can check entered data in console"
    );
    console.log(data);
    dispatch(resetCartForm());
    methods.reset(defaultValues);
    navigate("/products");
  };

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
