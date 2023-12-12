import axios from "axios";

const productInstance = axios.create({
    baseURL: "https://6536e198bb226bb85dd2b349.mockapi.io",
});

const countryInstance = axios.create({
    baseURL: "https://countriesnow.space/api/v0.1",
});


export {
    productInstance,
    countryInstance,
}
