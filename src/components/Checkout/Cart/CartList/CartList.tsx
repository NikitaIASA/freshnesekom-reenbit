import { FC } from "react";

import { useAppSelector } from "@hooks/useAppSelector";
import { selectCartItems } from "@store/selectors/cartSelectors";
import { CartItem } from "../CartItem/CartItem";

import "./CartList.scss";

export const CartList: FC = () => {
  const items = useAppSelector(selectCartItems);

  return (
    <ul className="cart-list">
      {items?.map((item, key) => (
        <CartItem key={`cart-item-${key}`} item={item} />
      ))}
    </ul>
  );
};
