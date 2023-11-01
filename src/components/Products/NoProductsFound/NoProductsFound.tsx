import { FC } from "react";

import "./NoProductsFound.scss";

interface NoProductsFoundProps {
  searchQuery?: string;
  selectedCategory?: string;
}

export const NoProductsFound: FC<NoProductsFoundProps> = ({
  searchQuery,
  selectedCategory,
}) => {
  let message = "No products available.";

  if (searchQuery) {
    message = `Nothing found for "${searchQuery}".`;
  } else if (selectedCategory && selectedCategory !== "All Categories") {
    message = `No available products in "${selectedCategory}".`;
  }

  return <div className="no-products-found">{message}</div>;
};
