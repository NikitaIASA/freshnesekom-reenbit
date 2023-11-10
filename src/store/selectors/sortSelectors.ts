import { RootState } from "@store/store";

export const selectSortBy = (state: RootState) => state.products.sortBy;
