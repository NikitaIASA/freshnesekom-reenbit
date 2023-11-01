import { FC } from "react";

import ProductCard from "../ProductCard";
import NoProductsFound from "../NoProductsFound";
import { ProductSkeleton } from "@components/Products/ProductSkeleton/ProductSkeleton";
import { STATUSES } from "@constants/statuses";
import { PRODUCTS_SKELETON_COUNT } from "@constants/elementsCount";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectFilteredProducts } from "@store/selectors/productSelectors";
import { selectSearchQuery, selectCategory } from "@store/selectors/productSelectors";

import "./ProductList.scss";

interface ProductListProps {
  status: string;
}

export const ProductList: FC<ProductListProps> = ({status }) => {
  const searchQuery = useAppSelector(selectSearchQuery); 
  const selectedCategory = useAppSelector(selectCategory);

  const skeletons = [...new Array(PRODUCTS_SKELETON_COUNT)].map((_, index) => (
    <ProductSkeleton key={index} />
  ));

  const filteredProducts = useAppSelector(selectFilteredProducts);

  if (status === STATUSES.LOADING) {
    return <div className="product-list">{skeletons}</div>;
  }

  if (!filteredProducts?.length) {
    if (searchQuery) {
      return <NoProductsFound searchQuery={searchQuery}/>
    } else {
      return <NoProductsFound selectedCategory={selectedCategory}/>
    }
  }

  return (
    <ul className="product-list">
      {filteredProducts?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
};
