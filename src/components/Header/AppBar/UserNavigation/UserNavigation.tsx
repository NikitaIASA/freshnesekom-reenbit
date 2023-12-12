import { FC } from "react";
import { Link } from "react-router-dom";

import userIcon from "@assets/images/user-icon.svg";
import cartIcon from "@assets/images/cart-icon.svg";

import "./UserNavigation.scss";

export const UserNavigation: FC = () => {
  return (
    <div className="user-navigation">
      <Link to="/" className="user-navigation__link">
        <img src={userIcon} alt="user" />
      </Link>
      <Link to="/checkout" className="user-navigation__link">
        <img src={cartIcon} alt="cart" />
      </Link>
    </div>
  );
};
