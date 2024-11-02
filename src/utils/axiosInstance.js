// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000',
    withCredentials: true,
});

axiosInstance.interceptors.request.use(config => {
    const language = localStorage.getItem('language') || 'en';
    config.headers['Accept-Language'] = language;
    return config;
}, error => {
    return Promise.reject(error);
});

export default axiosInstance;
