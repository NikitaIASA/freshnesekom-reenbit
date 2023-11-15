import { IProduct } from "@appTypes/products";
import {ItemsPerPageByPage} from "@store/reducers/productSlice";

export const calculatePagesCount = (products: IProduct[], itemsPerPageByPage: ItemsPerPageByPage, defaultItemsPerPage: number) => {
    let totalProductsShown = 0;
    let pageCount = 0;
    const totalProducts = products.length;

    for (let i = 1; totalProductsShown < totalProducts; i++) {
        const itemsPerPage = itemsPerPageByPage[i] || defaultItemsPerPage;
        totalProductsShown += itemsPerPage;
        pageCount++;
    }

    return pageCount;
};

export const getItemRangeForPage = (page: number, itemsPerPageByPage: ItemsPerPageByPage, defaultItemsPerPage: number) => {
    let firstItemIndex = 0;

    for (let i = 1; i < page; i++) {
        firstItemIndex += itemsPerPageByPage[i] || defaultItemsPerPage;
    }

    return {
        firstItem: firstItemIndex,
        lastItem: firstItemIndex + (itemsPerPageByPage[page] || defaultItemsPerPage),
    };
};
