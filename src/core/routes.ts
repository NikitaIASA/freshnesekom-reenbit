import { FC } from 'react';

import { HomePage } from '@pages/HomePage';
import { ProductsPage } from '@pages/ProductsPage';
import { ProductPage } from '@pages/ProductPage';
import { NotFoundPage } from '@pages/NotFoundPage';
import { ROUTE_PATHS } from '@constants/routePaths';

interface RouteItem {
    path: string;
    Element: FC;
    private?: boolean;
}

export const routes: RouteItem[] = [
    {
        path: ROUTE_PATHS.HOME,
        Element: HomePage,
    },
    {
        path: ROUTE_PATHS.PRODUCTS,
        Element: ProductsPage,
    },
    {
        path: ROUTE_PATHS.PRODUCT,
        Element: ProductPage,
    },
    {
        path: ROUTE_PATHS.NOT_FOUND,
        Element: NotFoundPage,
    },
];
