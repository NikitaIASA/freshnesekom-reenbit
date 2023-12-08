import { FC } from "react";
import { Link } from "react-router-dom";

import CustomButton from "@components/UI/CustomButton";
import { ButtonSizes } from "@appTypes/buttonTypes";
import { ROUTE_PATHS } from "@constants/routePaths";

import "./FormSuccessMessage.scss";

export const FormSuccessMessage: FC = () => {
  return (
    <div className="form-success-message">
      <h2 className="form-success-message__title">
        Your order has been successfully received!
      </h2>
      <Link to={ROUTE_PATHS.PRODUCTS}>
        <CustomButton size={ButtonSizes.SMALL}>Continue shopping</CustomButton>
      </Link>
    </div>
  );
};
