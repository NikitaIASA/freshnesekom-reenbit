import { FC } from "react";

import ProductCard from "../ProductCard";
import NoProductsFound from "../NoProductsFound";
import { ProductSkeleton } from "@components/Products/ProductSkeleton/ProductSkeleton";
import { STATUSES } from "@constants/statuses";
import { useAppSelector } from "@hooks/useAppSelector";
import { selectFilteredProducts } from "@store/selectors/productSelectors";
import { selectSearchQuery, selectCategory } from "@store/selectors/productSelectors";

import "./ProductList.scss";

interface ProductListProps {
  status: string;
}

export const ProductList: FC<ProductListProps> = ({ status }) => {
  const searchQuery = useAppSelector(selectSearchQuery); 
  const selectedCategory = useAppSelector(selectCategory);

  const skeletons = [...new Array(5)].map((_, index) => (
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
    <div className="product-list">
      {filteredProducts?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
