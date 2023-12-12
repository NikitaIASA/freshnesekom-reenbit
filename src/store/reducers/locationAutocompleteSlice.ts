import { createSlice } from '@reduxjs/toolkit';
import locationAutoCompleteServices from '@store/services/locationAutoCompleteServices';

interface locationAutocompleteState {
    countries: string[];
    cities: string[];
    loading: boolean;
    error: string | null;
}

const initialState: locationAutocompleteState = {
    countries: [],
    cities: [],
    loading: false,
    error: null,
};

export const locationAutocompleteSlice = createSlice({
    name: 'locationAutocomplete',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(locationAutoCompleteServices.getCountries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(locationAutoCompleteServices.getCountries.fulfilled, (state, action) => {
                state.countries = action.payload;
                state.loading = false;
            })
            .addCase(locationAutoCompleteServices.getCountries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(locationAutoCompleteServices.getCitiesByCountry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(locationAutoCompleteServices.getCitiesByCountry.fulfilled, (state, action) => {
                state.cities = action.payload;
                state.loading = false;
            })
            .addCase(locationAutoCompleteServices.getCitiesByCountry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default locationAutocompleteSlice.reducer;
