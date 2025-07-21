import axios, {AxiosError} from 'axios';
import {message} from "../providers/MessageProvider.tsx";
import type {BaseResponse} from "../models/api.ts";
import {useUIStore} from "../store/uiStore.ts";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080/api/v1',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const language = useUIStore.getState().language;
        if (language) {
            config.headers['Accept-Language'] = language;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        const data: BaseResponse<any> = response.data;
        if (data.error) {
            message.error(data.message);
            return Promise.reject(data);
        }
        if (response.config.method !== 'get') {
            message.success(data.message);
        }
        return response;
    },
    (error: AxiosError<BaseResponse<any>>) => {
        if (error.response) {
            const data = error.response.data;
            message.error(data.message || 'An unknown error occurred');
            return Promise.reject(data);
        }
        message.error(error.message || 'An unknown error occurred');
        return Promise.reject(error);
    }
); 