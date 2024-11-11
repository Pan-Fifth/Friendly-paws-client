import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://man-diverse-anchovy.ngrok-free.app/',
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
