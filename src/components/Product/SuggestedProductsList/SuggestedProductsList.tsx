import { FC } from "react";
import Carousel from "react-multi-carousel";

import { useAppSelector } from "@hooks/useAppSelector";
import {
  selectProducts,
  selectSelectedProduct,
} from "@store/selectors/productSelectors";
import SuggestedProduct from "../SuggestedProduct";
import ButtonGroup from "./ButtonGroup";
import { responsiveCarousel } from "@constants/breakpoints";

import "react-multi-carousel/lib/styles.css";
import "./SuggestedProductsList.scss";

export const SuggestedProductsList: FC = () => {
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const allProducts = useAppSelector(selectProducts);

  const suggestedProducts = allProducts?.filter(
    (product) =>
      product.category === selectedProduct?.category &&
      product.id !== selectedProduct?.id
  );

  return (
    <div className="suggested-products">
      <Carousel
        responsive={responsiveCarousel}
        infinite={true}
        draggable={false}
        arrows={false}
        renderButtonGroupOutside={true}
        // eslint-disable-next-line
        // @ts-expect-error
        customButtonGroup={<ButtonGroup />}
      >
        {suggestedProducts?.map((product) => (
          <SuggestedProduct key={`product-${product.id}`} product={product} />
        ))}
      </Carousel>
    </div>
  );
};
