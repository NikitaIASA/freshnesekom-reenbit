import { FC } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { useAppSelector } from "@hooks/useAppSelector";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { selectProducts } from "@store/selectors/productSelectors";
import { removeItem } from "@store/reducers/cartSlice";
import Stars from "@components/UI/Stars";
import { selectCartItems } from "@store/selectors/cartSelectors";
import QuantityInput from "./QuantityInput";
import { useModal } from "@hooks/useModal";
import ConfirmationModal from "@components/UI/ConfirmationModal";
import { BOX, BOX_ITEMS } from "@constants/productUnits";
import { ICartItem } from "@appTypes/cartItem";
import { ROUTE_PATHS } from "@constants/routePaths";
import heartIcon from "@assets/images/red-heart.svg";
import removeIcon from "@assets/images/clear-icon.svg";

import "./CartItem.scss";

interface CartItemProps {
  item: ICartItem;
}

export const CartItem: FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const allProducts = useAppSelector(selectProducts);
  const cartProducts = useAppSelector(selectCartItems);

  const { isModalOpened, openModal, closeModal } = useModal();

  const product = allProducts.find(({ id }) => id === item.id);
  const cartProduct = cartProducts.find(
    ({ id, unit }) => id === item.id && unit === item.unit
  );

  const { title, image, rating, price, brand, category, buyBy, stock } =
    product ?? {};

  const handleRemoveItem = () => {
    dispatch(
      removeItem({
        id: item.id,
        unit: item.unit,
      })
    );
    closeModal();
    toast.success(`Product "${title}" successfully removed from the cart`);
  };

  const totalItemPrice =
    item.unit === BOX
      ? item.price * item.quantity * BOX_ITEMS
      : item.price * item.quantity;

  return (
    <>
      <div className="cart-item">
        <div className="cart-item__image-block">
          <Link to={`${ROUTE_PATHS.PRODUCTS}/${item.id}`}>
            <img
              className="cart-item__image"
              src={image![0]}
              alt="product image"
            />
          </Link>
          <div className="cart-item__buttons">
            <button className="cart-item__button">
              <img
                className="cart-item__button-image"
                src={heartIcon}
                alt="Wishlist button"
              />
              <span className="cart-item__button-text">Wishlist</span>
            </button>
            <button className="cart-item__button" onClick={openModal}>
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
          <Link to={`${ROUTE_PATHS.PRODUCTS}/${item.id}`}>
            <h3 className="cart-item__title">{title}</h3>
          </Link>
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
          <div className="cart-item__price-block">
            <p className="cart-item__price">{`${totalItemPrice} ${price?.currency}`}</p>
            <QuantityInput item={cartProduct!} units={buyBy!} stock={stock!} />
          </div>
        </div>
      </div>
      {isModalOpened && (
        <ConfirmationModal
          message={`Are you sure you want to delete "${title}" product ?`}
          onConfirm={handleRemoveItem}  
          onClose={closeModal}
        />
      )}
    </>
  );
};
