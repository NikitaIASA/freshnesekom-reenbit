import { FC, useState } from "react";
import { useAppSelector } from "@hooks/useAppSelector";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { selectSelectedProduct } from "@store/selectors/productSelectors";
import QuantitySelector from "./QuantitySelector";
import CustomButton from "@components/UI/CustomButton";
import { ButtonSizes, ButtonVariants } from "@appTypes/buttonTypes";
import ProductTabs from "../ProductTabs";
import { addItem } from "@store/reducers/cartSlice";
import Stars from "@components/UI/Stars";
import plus from "@assets/images/plus.svg";
import heart from "@assets/images/heart.svg";

import "./ProductInfoBlock.scss";

const BOX_ITEMS = 5;
const REVIEW_SINGLE = "customer review";
const REVIEW_PLURAL = "customer reviews";
const BOX = "box";

export const ProductInfoBlock: FC = () => {
  const dispatch = useAppDispatch();
  const selectedProduct = useAppSelector(selectSelectedProduct);

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
    deliveryTime,
    deliveryArea,
    price,
    extraInfo,
  } = selectedProduct || {};

  const [error, setError] = useState<string | null>(null);
  const [totalNewPrice, setTotalNewPrice] = useState<number>(0);
  const [totalOldPrice, setTotalOldPrice] = useState<number>(0);

  const [quantity, setQuantity] = useState<number>(1);
  const [selectedUnit, setSelectedUnit] = useState<string>(buyBy![0]);

  const reviewsCount = extraInfo?.reviews.length;
  const reviewsLabel = reviewsCount === 1 ? REVIEW_SINGLE : REVIEW_PLURAL;
  const conversionRate = buyBy?.includes(BOX) ? BOX_ITEMS : 1;

  const handleQuantityChange = (quantity: number, unit: string) => {
    const actualQuantity = unit === BOX ? quantity * conversionRate : quantity;
    if (price) {
      setTotalNewPrice(parseFloat((actualQuantity * price.current).toFixed(2)));
      setTotalOldPrice(parseFloat((actualQuantity * price.previous).toFixed(2)));
    }
  
    return actualQuantity;
  };

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
    Delivery: deliveryTime,
    "Delivery area": deliveryArea,
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      dispatch(addItem({
        id: selectedProduct.id,
        name: selectedProduct.title,
        price: selectedProduct.price.current,
        quantity: quantity,
        unit: selectedUnit,
      }));
    }
  };

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
      <div className="product-info__price-block">
        <div className="product-info__price-block-container">
          <div className="product-info__prices">
            <p className="product-info__new-price">{`${totalNewPrice} ${price?.currency}`}</p>
            <p className="product-info__old-price">{`${totalOldPrice} ${price?.currency}`}</p>
          </div>
          {price && (
            <QuantitySelector
              initialQuantity={1}
              units={buyBy!}
              maxQuantity={stock}
              onQuantityChange={(quantity: number, unit: string) =>
                handleQuantityChange(quantity, unit)
              }
              setError={setError}
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
      <ProductTabs/>
    </div>
  );
};

export default ProductInfoBlock;
