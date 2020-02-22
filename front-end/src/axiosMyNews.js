import axios from 'axios';
import {apiURL} from "./constants";

const axiosMyNews = axios.create({
    baseURL: apiURL
});

export default axiosMyNews;
