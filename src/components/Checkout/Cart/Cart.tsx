import { FC } from "react";

import "./Cart.scss";
import CartList from "./CartList";

interface CartProps {}

export const Cart: FC<CartProps> = () => {
  return (
    <div className="cart">
      <h2 className="cart__title">Order Summary</h2>
      <p className="cart__details">
        Price can change depending on shipping method and taxes of your state.
      </p>

      <CartList/>
    </div>
  );
};
