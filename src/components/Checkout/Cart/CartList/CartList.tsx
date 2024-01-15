import { FC } from "react";
import { Link } from "react-router-dom";

import { ROUTE_PATHS } from "@constants/routePaths";
import CustomButton from "@components/UI/CustomButton";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectCartItems } from "@store/selectors/cartSelectors";
import { CartItem } from "../CartItem/CartItem";

import "./CartList.scss";

export const CartList: FC = () => {
  const items = useAppSelector(selectCartItems);

  if (!items.length) {
    return (
      <div className="cart-list--empty">
        <h2 className="cart-list__title">Your cart is empty!</h2>
        <img
          className="cart-list__empty-cart-image"
          src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png"
          alt="emprt cart"
        />
        <Link to={ROUTE_PATHS.PRODUCTS}>
          <CustomButton>Go shopping</CustomButton>
        </Link>
      </div>
    );
  }

  return (
    <ul className="cart-list">
      {items?.map((item, key) => (
        <CartItem key={`cart-item-${key}`} item={item} />
      ))}
    </ul>
  );
};
