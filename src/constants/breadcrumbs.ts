export const enum PATHS {
    HOME = "",
    PRODUCTS = "products",
    CART = "cart",
    NOT_FOUND = "*"
}

export const BREADCRUMBS_PATHS: Record<PATHS, string> = {
    [PATHS.HOME]: 'Homepage',
    [PATHS.PRODUCTS]: 'All Products',
    [PATHS.CART]: 'Checkout page',
    [PATHS.NOT_FOUND]: 'Not Found'
};
