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

import "./CountBlock.scss";

interface FormData {
  promoCode?: string;
}

const TAX_RATE = 0.17;

export const CountBlock: FC = () => {
  const CartItems = useAppSelector(selectCartItems);
  const allProducts = useAppSelector(selectProducts);
  const [discount, setDiscount] = useState<number>(0);
  const [isPromoApplied, setIsPromoApplied] = useState<boolean>(false);

  const maxDeliveryTime = CartItems.reduce((maxTime, cartItem) => {
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
  } = useForm<FormData>({
    resolver: yupResolver(promoCodeSchema),
  });

  const onSubmit = (data: FormData) => {
    const lowerCasePromoCode = data.promoCode?.toLowerCase();
    if (lowerCasePromoCode && PROMO_CODES[lowerCasePromoCode]) {
      setDiscount(PROMO_CODES[lowerCasePromoCode]);
      setIsPromoApplied(true);
    } else {
      setDiscount(0);
      setIsPromoApplied(false);
    }
  };

  const totalPrice = CartItems.reduce((sum, item) => {
    const quantity =
      item.unit === BOX ? item.quantity * BOX_ITEMS : item.quantity;
    return sum + item.price * quantity;
  }, 0);

  const discountedTotal = (totalPrice * (1 - discount)).toFixed(2);
  const taxAmount = (+discountedTotal * TAX_RATE).toFixed(2);
  const totalPriceWithTaxAndDiscount = (+discountedTotal + +taxAmount).toFixed(
    2
  );

  return (
    <div className="count-block">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="count-block__label" htmlFor="promoCode">
          <input
            className="count-block__input"
            {...register("promoCode")}
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
            disabled={isPromoApplied}
          >
            Apply
          </button>
        </label>
      </form>
      <ul className="count-block__price-list">
        <li className="count-block__price-item">
          <span className="count-block__price-value">Subtotal</span>
          <p className="count-block__price-value">{discountedTotal}</p>
        </li>
        <li className="count-block__price-item">
          <span className="count-block__price-value">Tax</span>
          <p className="count-block__price-value">{taxAmount}</p>
        </li>
      </ul>
      <div className="count-block__total-price">
        <div>
          <p className="count-block__price-value">Total Order</p>
          <p className="count-block__total-price-delivery">
            Guaranteed delivery day: {guaranteedDeliveryDate}
          </p>
        </div>
        <p className="count-block__total-price-value">
          {totalPriceWithTaxAndDiscount}
        </p>
      </div>
    </div>
  );
};
