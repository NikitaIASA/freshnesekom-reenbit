import { IPrice } from "./price";
import { IShipping } from "./shipping";
import { IExtraInfo } from "./extraInfo";

export interface IProduct {
    id: number;
    image: string;
    title: string;
    description: string;
    brand: string;
    model: string;
    delivery: string;
    stock: string;
    price: IPrice;
    rating: number;
    shipping: IShipping;
    country: number;
    size: string;
    category: string;
    buyBy: string[];
    stockStatus: string;
    deliveryTime: string;
    color: string;
    deliveryArea: string;
    extraInfo: IExtraInfo;
}
