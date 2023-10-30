export interface IPrice {
    current: number;
    previous: number;
    currency: string;
}

export interface IShipping {
    type: string;
    deliveryTime: string;
}

export interface IDetails {
    freshness?: string;
    brand?: string;
    model?: string;
    delivery: string;
    stock: string;
}

export interface IReview {
    user: string;
    rating: number;
    comment: string;
}

export interface IQuestion {
    user: string;
    question: string;
    answer: string;
}

export interface IExtraInfo {
    descriptions: {
        origins?: string;
        howToCook?: string;
        features?: string;
        warranty?: string;
    };
    reviews: IReview[];
    questions: IQuestion[];
}

export interface IProduct {
    id: number;
    image: string;
    title: string;
    description: string;
    price: IPrice;
    rating: number;
    shipping: IShipping;
    details: IDetails;
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
