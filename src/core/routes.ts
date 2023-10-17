import { FC } from 'react';

import { HomePage } from '@pages/HomePage';
import { ProductsPage } from '@pages/ProductsPage';
import { ProductPage } from '@pages/ProductPage';
import { NotFoundPage } from '@pages/NotFoundPage';

interface RouteItem {
    path: string;
    Element: FC;
    private?: boolean;
}

export const routes: Record<string, RouteItem> = {
    Home: {
        path: '/',
        Element: HomePage,
    },
    Products: {
        path: '/products',
        Element: ProductsPage,
    },
    Product: {
        path: '/products/:product',
        Element: ProductPage,
    },
    NotFound: {
        path: '*',
        Element: NotFoundPage,
    },
};