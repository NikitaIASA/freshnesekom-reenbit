import { FC } from "react";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectSelectedProduct } from "@store/selectors/productSelectors";
import { capitalizeTitle } from "@helpers/capitalizeTitle";

import "./ProductDescriptionTab.scss";

export const ProductDescriptionTab: FC = () => {
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const extraInfo = selectedProduct?.extraInfo?.descriptions;

  return (
    <div className="product-description">
      {extraInfo ? (
        <ul className="product-description__list">
          {Object.entries(extraInfo).map(([key, value]) => (
            <li key={`description-${key}`} className="product-description__item">
              <h3 className="product-description__title">
                {capitalizeTitle(key)}
              </h3>
              <p className="product-description__text">{value}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>
          No additional information available.
        </p>
      )}
    </div>
  );
};
