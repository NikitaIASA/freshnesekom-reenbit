import { FC } from "react";
import { useAppSelector } from "@hooks/useAppSelector";

import { CartItem } from "../CartItem/CartItem";

import "./CartList.scss";

interface CartListProps {}

export const CartList: FC<CartListProps> = () => {
  const items = useAppSelector((state) => state.cart.items);

  return (
    <ul className="cart-list">
      {items?.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </ul>
  );
};
