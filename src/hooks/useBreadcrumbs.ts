import { useLocation, useParams } from 'react-router-dom';

import { useAppSelector } from './useAppSelector';
import { PATHS, BREADCRUMBS_PATHS } from '@constants/breadcrumbs';

const NOT_FOUND = 'Not found';

export const useBreadcrumbs = () => {
    const productsList = useAppSelector((state) => state.products.products);
    const { pathname } = useLocation();
    const { product } = useParams();

    const paths = pathname.split('/').filter((path) => !!path);

    const productTitle = product
    ? productsList.find(({ id }) => id.toString() === product)?.title
    : undefined;

    const getBreadcrumb = (path: string) => {
        const breadcrumb = BREADCRUMBS_PATHS[path as PATHS];

        return breadcrumb || productTitle || NOT_FOUND;
    };

    return {
        paths,
        getBreadcrumb,
    };
};
