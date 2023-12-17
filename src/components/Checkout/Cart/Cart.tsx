import { FC } from "react";

import CartList from "./CartList";
import CountBlock from "./CountBlock";

import "./Cart.scss";

export const Cart: FC = () => {
  return (
    <div className="cart">
      <h2 className="cart__title">Order Summary</h2>
      <p className="cart__details">
        Price can change depending on shipping method and taxes of your state.
      </p>
      <CartList />
      <CountBlock />
    </div>
  );
};
