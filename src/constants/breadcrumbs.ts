export const enum PATHS {
    HOME = "",
    PRODUCTS = "products",
    CHECKOUT = "checkout",
    NOT_FOUND = "*"
}

export const BREADCRUMBS_PATHS: Record<PATHS, string> = {
    [PATHS.HOME]: 'Homepage',
    [PATHS.PRODUCTS]: 'All Products',
    [PATHS.CHECKOUT]: 'Checkout page',
    [PATHS.NOT_FOUND]: 'Not Found'
};
