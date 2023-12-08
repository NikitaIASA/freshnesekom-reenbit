import { FC } from "react";
import { useAppSelector } from "@hooks/useAppSelector";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { selectProducts } from "@store/selectors/productSelectors";
import { removeItem } from "@store/reducers/cartSlice";

import heartIcon from "@assets/images/red-heart.svg";
import removeIcon from "@assets/images/clear-icon.svg";

import "./CartItem.scss";
import Stars from "@components/UI/Stars";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

interface CartItemProps {
  item: CartItem;
}

export const CartItem: FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(selectProducts);
  const product = allProducts.find(({ id }) => id === item.id);

  const { title, image, rating, price, brand, category } = product ?? {};

  const handleRemoveItem = () => {
    dispatch(
      removeItem({
        id: item.id,
        unit: item.unit,
      })
    );
  };

  return (
    <div className="cart-item">
      <div className="cart-item__image-block">
        <img className="cart-item__image" src={image![0]} alt="product image" />
        <div className="cart-item__buttons">
          <button className="cart-item__button">
            <img
              className="cart-item__button-image"
              src={heartIcon}
              alt="Wishlist button"
            />
            <span className="cart-item__button-text">Wishlist</span>
          </button>
          <button className="cart-item__button" onClick={handleRemoveItem}>
            <img
              className="cart-item__button-image"
              src={removeIcon}
              alt="Remove button"
            />
            <span className="cart-item__button-text">Remove</span>
          </button>
        </div>
      </div>
      <div className="cart-item__description-block">
        <h3 className="cart-item__title">{title}</h3>
        <ul className="cart-item__description">
          <li className="cart-item__description-item">
            <span className="cart-item__description-key">Category:</span>
            <span className="cart-item__description-value">{category}</span>
          </li>
          <li className="cart-item__description-item">
            <span className="cart-item__description-key">Brand:</span>
            <span className="cart-item__description-value">{brand}</span>
          </li>
        </ul>
        <Stars rating={rating!} />
        <p className="cart-item__price">{`${price?.current} ${price?.currency}`}</p>
      </div>
    </div>
  );
};
