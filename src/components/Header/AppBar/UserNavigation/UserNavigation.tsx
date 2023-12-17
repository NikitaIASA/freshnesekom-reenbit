import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@hooks/useAppSelector";

import userIcon from "@assets/images/user-icon.svg";
import cartIcon from "@assets/images/cart-icon.svg";

import "./UserNavigation.scss";
import { selectCartItems } from "@store/selectors/cartSelectors";

export const UserNavigation: FC = () => {
  const cartItems = useAppSelector(selectCartItems);
  const cartItemsCount = cartItems.length;

  return (
    <div className="user-navigation">
      <Link to="/" className="user-navigation__link">
        <img src={userIcon} alt="user" />
      </Link>
      <Link to="/checkout" className="user-navigation__link">
        <img
          className="user-navigation__cart-image"
          src={cartIcon}
          alt="cart"
        />
        {!!cartItemsCount && (
          <span className="user-navigation__cart-items">{cartItemsCount}</span>
        )}
      </Link>
    </div>
  );
};
