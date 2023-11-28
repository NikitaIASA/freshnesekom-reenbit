import { FC } from "react";

import ProductCard from "../ProductCard";
import NoProductsFound from "../NoProductsFound";
import ProductsSkeleton from "../ProductSkeleton";
import { STATUSES } from "@constants/statuses";
import { PRODUCTS_SKELETON_COUNT } from "@constants/elementsCount";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectSearchQuery, selectCategory } from "@store/selectors/productSelectors";
import { selectShownProducts } from "@store/selectors/paginationSelectors";

import "./ProductList.scss";

interface ProductListProps {
  status: string;
}

export const ProductList: FC<ProductListProps> = ({status }) => {
  const searchQuery = useAppSelector(selectSearchQuery); 
  const selectedCategory = useAppSelector(selectCategory);

  const skeletons = [...new Array(PRODUCTS_SKELETON_COUNT)].map((_, index) => (
    <ProductsSkeleton key={index} />
  ));

  const shownProducts = useAppSelector(selectShownProducts)

  if (status === STATUSES.LOADING) {
    return <div className="product-list">{skeletons}</div>;
  }

  if (!shownProducts?.length) {
    if (searchQuery) {
      return <NoProductsFound searchQuery={searchQuery}/>
    } else {
      return <NoProductsFound selectedCategory={selectedCategory}/>
    }
  }

  return (
    <ul className="product-list">
      {shownProducts?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
};
