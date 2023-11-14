export enum SORT_OPTIONS {
    DEFAULT = 'Default',
    PRICE_ASC = 'price_asc',
    PRICE_DESC = 'price_desc',
    RATING_ASC = 'rating_asc',
    RATING_DESC = 'rating_desc',
    NAME_ASC = 'name_asc',
    NAME_DESC = 'name_desc',
    STOCK_ASC = 'stock_asc',
    STOCK_DESC = 'stock_desc',
}

export const sortItems = [
    { sortName: "Default", sortKey: SORT_OPTIONS.DEFAULT },
    { sortName: "Price: Low to High", sortKey: SORT_OPTIONS.PRICE_ASC },
    { sortName: "Price: High to Low", sortKey: SORT_OPTIONS.PRICE_DESC },
    { sortName: "Rating: Low to High", sortKey: SORT_OPTIONS.RATING_ASC},
    { sortName: "Rating: High to Low", sortKey: SORT_OPTIONS.RATING_DESC },
    { sortName: "Stock: Low to High", sortKey: SORT_OPTIONS.STOCK_ASC },
    { sortName: "Stock: High to Low", sortKey: SORT_OPTIONS.STOCK_DESC },
    { sortName: "Name: A to Z", sortKey: SORT_OPTIONS.NAME_ASC },
    { sortName: "Name: Z to A",sortKey: SORT_OPTIONS.NAME_DESC },
];
