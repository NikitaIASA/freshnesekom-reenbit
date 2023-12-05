import { RootState } from "@store/store";

export const selectAutoCompleteCountries = (state: RootState) => state.locationAutocomplete.countries;
export const selectAutoCompleteCities = (state: RootState) => state.locationAutocomplete.cities;
