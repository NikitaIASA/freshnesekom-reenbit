import { FC } from "react";
import { ButtonGroupProps } from "react-multi-carousel";

import arrow from "@assets/images/arrow-right-green.svg";

import "./ButtonGroup.scss";

export const ButtonGroup: FC = ({ next, previous }: ButtonGroupProps) => {
  return (
    <div className="suggested-products__top-block">
      <h2 className="suggested-products__title">You will maybe love</h2>
      <div className="suggested-products__more-products-block">
        <img
          onClick={() => next?.()}
          className="suggested-products__arrow-image arrow-left"
          src={arrow}
          alt="arrow"
        />
        <p className="suggested-products__more-products-title">More products</p>
        <img
          onClick={() => previous?.()}
          className="suggested-products__arrow-image"
          src={arrow}
          alt="arrow"
        />
      </div>
    </div>
  );
};
