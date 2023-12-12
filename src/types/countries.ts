export interface ICountry {
    country: string;
    cities: string[];
}

export interface ICountriesResponse {
    error: boolean;
    msg: string;
    data: ICountry[];
}
