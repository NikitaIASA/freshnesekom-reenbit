import { FC } from "react";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectSelectedProduct } from "@store/selectors/productSelectors";

import "./ProductDescriptionTab.scss";

export const ProductDescriptionTab: FC = () => {
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const extraInfo = selectedProduct?.extraInfo?.descriptions;

  // Function to capitalize the first letter of each title
  const formatTitle = (key: string): string => {
    const formattedKey = key.replace(/([A-Z])/g, " $1").toLowerCase();
    return formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1);
  };

  return (
    <div className="product-description">
      {extraInfo ? (
        <ul className="product-description__list">
          {Object.entries(extraInfo).map(([key, value]) => (
            <li key={`description-${key}`} className="product-description__item">
              <h3 className="product-description__title">
                {formatTitle(key)}
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
