import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useAppSelector } from "@hooks/useAppSelector";
import { selectCartItems } from "@store/selectors/cartSelectors";
import { PROMO_CODES } from "@constants/promocodes";
import { promoCodeSchema } from "@schemas/promoCodeSchema";
import { calculateDeliveryDate } from "@helpers/calculateDeliveryDate";
import { selectProducts } from "@store/selectors/productSelectors";
import { BOX, BOX_ITEMS } from "@constants/productUnits";
import { preventEnterSubmit } from "@helpers/preventEnterSubmit";
import { USUAL_TAX_RATE } from "@constants/productTaxes";
import { PROMOCODE_FIELD } from "@constants/promocodeForm";

import "./CountBlock.scss";

interface FormData {
  promoCode?: string;
}

export const CountBlock: FC = () => {
  const cartItems = useAppSelector(selectCartItems);
  const allProducts = useAppSelector(selectProducts);
  const [discount, setDiscount] = useState<number>(0);
  const [promoCode, setPromoCode] = useState(""); // State for checking for empty string
  const [isPromoApplied, setIsPromoApplied] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState(false); 

  const maxDeliveryTime = cartItems.reduce((maxTime, cartItem) => {
    const product = allProducts.find((p) => p.id === cartItem.id);
    return product && product.deliveryTime > maxTime
      ? product.deliveryTime
      : maxTime;
  }, 0);

  const guaranteedDeliveryDate = calculateDeliveryDate(maxDeliveryTime);

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(promoCodeSchema),
    mode: "onSubmit",
  });

  const onSubmit = (data: FormData) => {
    setSubmitted(true);
    const lowerCasePromoCode = data.promoCode?.toLowerCase();
    if (lowerCasePromoCode && PROMO_CODES[lowerCasePromoCode]) {
      setDiscount(PROMO_CODES[lowerCasePromoCode]);
      setIsPromoApplied(true);
    } else {
      setDiscount(0);
      setIsPromoApplied(false);
    }
  };

  /*Logic to validate only by submission, instead of the default react-hook-form
   logic which revalidates for any changes after the first submission 
*/
  const validateField = (fieldName: keyof FormData) => {
    if (submitted) {
      trigger(fieldName);
    }
  };

  const totalPrice = (cartItems.reduce((sum, item) => {
    const quantity =
      item.unit === BOX ? item.quantity * BOX_ITEMS : item.quantity;
    return sum + item.price * quantity;
  }, 0)).toFixed(2);

  const taxAmount = (+totalPrice * USUAL_TAX_RATE).toFixed(2);
  const taxPercentage = USUAL_TAX_RATE * 100;
  const discountPercentage = discount * 100;
  const totalPriceWithTax = +totalPrice * (1 + USUAL_TAX_RATE);
  const discountAmount = totalPriceWithTax * discount;
  const discountedTotal = (totalPriceWithTax - discountAmount).toFixed(2);

  const discountMessage = isPromoApplied
    ? `${discountPercentage}% (-${discountAmount.toFixed(2)} USD)`
    : "";

  return (
    <div className="count-block">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="count-block__label" htmlFor={PROMOCODE_FIELD}>
          <input
            className="count-block__input"
            {...register(PROMOCODE_FIELD)}
            onChange={(e) => {
              validateField(PROMOCODE_FIELD);
              setPromoCode(e.target.value);
            }}
            onKeyDown={preventEnterSubmit}
            placeholder="Enter promo code"
            disabled={isPromoApplied}
          />
          {isPromoApplied && (
            <p className="count-block__success-message">Promo code applied!</p>
          )}
          {errors.promoCode && (
            <p className="count-block__error">{errors.promoCode.message}</p>
          )}
          <button
            className="count-block__button"
            type="submit"
            disabled={isPromoApplied || !promoCode.trim()}
          >
            Apply
          </button>
        </label>
      </form>
      <ul className="count-block__price-list">
        <li className="count-block__price-item">
          <span className="count-block__price-value">Subtotal</span>
          <p className="count-block__price-value">
            {totalPrice} USD
          </p>
        </li>
        <li className="count-block__price-item">
          <span className="count-block__price-value">Tax</span>
          <p className="count-block__price-value">
            {taxPercentage}% {taxAmount} USD
          </p>
        </li>
        {isPromoApplied && (
          <li className="count-block__price-item">
            <span className="count-block__price-value">Discount: </span>
            <p className="count-block__price-value">{discountMessage}</p>
          </li>
        )}
      </ul>
      <div className="count-block__total-price">
        <div>
          <p className="count-block__price-value">Total Order</p>
          {!!cartItems.length && (
            <p className="count-block__total-price-delivery">
              Guaranteed delivery day: {guaranteedDeliveryDate}
            </p>
          )}
        </div>
        <p className="count-block__total-price-value">{discountedTotal} USD</p>
      </div>
    </div>
  );
};
