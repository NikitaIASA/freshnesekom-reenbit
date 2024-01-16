import { FC, useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useAppSelector } from "@hooks/useAppSelector";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { selectSelectedProduct } from "@store/selectors/productSelectors";
import QuantitySelector from "./QuantitySelector";
import CustomButton from "@components/UI/CustomButton";
import { ButtonSizes, ButtonVariants } from "@appTypes/buttonTypes";
import ProductTabs from "../ProductTabs";
import { addItem } from "@store/reducers/cartSlice";
import { BOX, BOX_ITEMS } from "@constants/productUnits";
import { selectCartItems } from "@store/selectors/cartSelectors";
import { getValidUnitForm } from "@helpers/getValidUnitForm";
import Stars from "@components/UI/Stars";
import plus from "@assets/images/plus.svg";
import heart from "@assets/images/heart.svg";

import "./ProductInfoBlock.scss";

const REVIEW_SINGLE = "customer review";
const REVIEW_PLURAL = "customer reviews";

export const ProductInfoBlock: FC = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(selectSelectedProduct);
  const cartProducts = useAppSelector(selectCartItems);

  const {
    rating,
    title,
    description,
    country,
    category,
    stock = 0,
    color,
    size,
    buyBy,
    deliveryArea,
    price,
    shipping,
    extraInfo,
  } = selectedProduct || {};

  const [error, setError] = useState<string | null>(null);
  const [totalNewPrice, setTotalNewPrice] = useState<number>(0);
  const [totalOldPrice, setTotalOldPrice] = useState<number>(0);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedUnit, setSelectedUnit] = useState<string>(buyBy![0]);

  const reviewsCount = extraInfo?.reviews.length;
  const reviewsLabel = reviewsCount === 1 ? REVIEW_SINGLE : REVIEW_PLURAL;

  const calculatePrice = (qty: number, unit: string) => {
    const actualQuantity = unit === BOX ? qty * BOX_ITEMS : qty;
    if (price) {
      setTotalNewPrice(parseFloat((actualQuantity * price.current).toFixed(2)));
      setTotalOldPrice(parseFloat((actualQuantity * price.previous).toFixed(2)));
    }
  };

  useEffect(() => {
    calculatePrice(quantity, selectedUnit);
  }, [quantity, selectedUnit]);

  const formattedBuyBy = buyBy
    ?.map((unit) => (unit === BOX ? `${unit} (5 ${buyBy[0]})` : unit))
    .join(", ");

  const details = {
    Country: country,
    Category: category,
    Stock: stock ? "In stock" : "Out of stock",
    Color: color,
    Size: size,
    "Buy by": formattedBuyBy,
    Delivery: shipping?.deliveryTime,
    "Delivery area": deliveryArea,
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(
        addItem({
          id: selectedProduct.id,
          name: selectedProduct.title,
          price: selectedProduct.price.current,
          quantity: quantity,
          unit: selectedUnit,
        })
      );
      toast.success(`Product "${title}" added to the cart!`);
    }
  };

  const cartItemsForProduct = cartProducts.filter(
    (item) => item.id === selectedProduct?.id
  );

  const unitsSummary = cartItemsForProduct.reduce((summary, item) => {
    const unitForm = getValidUnitForm(item.quantity, item.unit);
    const unitInfo = `${item.quantity} ${unitForm}`;
    return summary ? `${summary}, ${unitInfo}` : unitInfo;
}, "");

  const inCartMessage = unitsSummary ? `In your cart: ${unitsSummary}.` : "";

  const calculateMaxAvailableQuantity = () => {
    const totalInCart = cartProducts.reduce((acc, item) => {
      if (item.id === selectedProduct?.id) {
        const quantityInBaseUnit = item.unit === BOX ? item.quantity * BOX_ITEMS : item.quantity;
        return acc + quantityInBaseUnit;
      }
      return acc;
    }, 0);

    const availableInBaseUnit = stock - totalInCart;
    return selectedUnit === BOX
      ? Math.floor(availableInBaseUnit / BOX_ITEMS)
      : availableInBaseUnit;
  };

  const validateQuantity = (qty: number, maxQty: number) => {
    if (qty < 1 || isNaN(qty)) {
      setError(
        `Product sold in quantities of at least ${1} ${selectedUnit}`
      );
    } else if (qty > maxQty) {
      const selectedUnitForm = getValidUnitForm(maxQty, selectedUnit)
      setError(`Max available quantity: ${maxQty} ${selectedUnitForm}`);
    } else {
      setError(null);
    }
  };

  useEffect(() => {
    const maxAvailableQuantity = calculateMaxAvailableQuantity();
    validateQuantity(quantity, maxAvailableQuantity);
  }, [cartProducts, selectedUnit, quantity]);

  return (
    <div className="product-info">
      <h2 className="product-info__title">{title}</h2>
      {rating && (
        <div className="product-info__rating">
          <Stars rating={rating} />
          {!!reviewsCount && (
            <p className="product-info__reviews-count">
              ({reviewsCount} {reviewsLabel})
            </p>
          )}
        </div>
      )}
      <p className="product-info__description">{description}</p>
      <div className="product-info__details">
        <ul className="product-info__details-list">
          {Object.entries(details).map(([key, value]) => (
            <li className="product-info__details-item" key={`details-${key}`}>
              <span className="product-info__details-title">{`${key}:`}</span>
              <span className="product-info__details-value">{value}</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="product-info__in-cart-message">{inCartMessage}</p>
      <div className="product-info__price-block">
        <div className="product-info__price-block-container">
          <div className="product-info__prices">
            <p className="product-info__new-price">{`${totalNewPrice} ${price?.currency}`}</p>
            <p className="product-info__old-price">{`${totalOldPrice} ${price?.currency}`}</p>
          </div>
          {price && (
            <QuantitySelector
              units={buyBy!}
              selectedUnit={selectedUnit}
              setSelectedUnit={setSelectedUnit}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          )}
          <CustomButton isDisabled={!!error?.length} onClick={handleAddToCart}>
            <img src={plus} alt="plus sign" />
            Add to cart
          </CustomButton>
        </div>
        {error && <p className="product-info__error-message">{error}</p>}
      </div>
      <CustomButton variant={ButtonVariants.SECONDARY} size={ButtonSizes.SMALL}>
        <img src={heart} alt="heart" />
        Add to my wish list
      </CustomButton>
      <ProductTabs />
    </div>
  );
};

export default ProductInfoBlock;
