import { RootState } from "@store/store";

export const selectCurrentPage = (state: RootState) => state.products.currentPage;
export const selectShownProducts = (state: RootState) => state.products.shownProducts;
export const selectItemsPerPageByPage = (state: RootState) => state.products.itemsPerPageByPage;
