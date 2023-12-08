import { countryInstance } from '@core/axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICountry } from '@appTypes/countries';

export const getCountriesService = async () => {
    try {
        const { data } = await countryInstance.get("/countries");
        return data.data;
    } catch (error) {
        throw new Error('Network error occurred');
    }
};

export const getCitiesByCountryService = async (countryCode: string) => {
    try {
        const { data } = await countryInstance.post("countries/cities", {
            country: countryCode,
        });
        return data.data;
    } catch (error) {
        throw new Error('Network error occurred');
    }
};

export const getCountries = createAsyncThunk<string[], void, { rejectValue: string }>(
    'countries/getCountries',
    async (_, { rejectWithValue }) => {
        try {
            const countries = await getCountriesService();
            const countryNames = [...new Set(countries.map((country: ICountry) => country.country))];
            return countryNames as string[];
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Network error occurred');
        }
    },
);

export const getCitiesByCountry = createAsyncThunk<string[], string, { rejectValue: string }>(
    'cities/getCitiesByState',
    async (countryCode, { rejectWithValue }) => {
        try {
            const cities = await getCitiesByCountryService(countryCode);

            return cities;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Network error occurred');
        }
    },
);


const locationAutocompleteServices = {
    getCountries,
    getCitiesByCountry,
};

export default locationAutocompleteServices;
