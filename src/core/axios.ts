import axios from "axios";

const instance = axios.create({
    baseURL: "https://6536e198bb226bb85dd2b349.mockapi.io",
});

export default instance; 
