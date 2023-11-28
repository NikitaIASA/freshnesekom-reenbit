import { FC, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import { getOneProduct } from "@store/services/productServices";
import ProductSkeleton from "@components/Product/ProductSkeleton";
import Product from "@components/Product";
import { STATUSES } from "@constants/statuses";

import {
  selectError,
  selectSelectedProduct,
  selectSelectedProductStatus,
} from "@store/selectors/productSelectors";
import { scrollToTop } from "@helpers/scrollToTop";
import ErrorBlock from "@components/UI/ErrorBlock";

export const ProductPage: FC = () => {
  const dispatch = useAppDispatch();
  const {product} = useParams<{ product: string }>();
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const status = useAppSelector(selectSelectedProductStatus);
  const error = useAppSelector(selectError)

  useEffect(() => {
    if (product) {
      dispatch(getOneProduct(product));
      scrollToTop([window]);
    }
  }, [dispatch, product]);

  if (status === STATUSES.LOADING) {
    return <ProductSkeleton/>;
  }

  if (status === STATUSES.FAILED) {
    return <ErrorBlock error={error}/>
  }

  if (!selectedProduct) {
    return <div>Product not found or failed to load.</div>;
  }

  return <Product />;
};
