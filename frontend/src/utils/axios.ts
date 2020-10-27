import {AxiosResponse, default as mainAxios } from 'axios';

export const axios = mainAxios.create({});

axios.interceptors.request.use(
    config => {
        if (config.url?.includes('/auth')) {
            return config;
        }
        const token = localStorage.getItem('jwt');
        if (token) {
            config.headers['common']['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    error => {
        Promise.reject(error)
    });

axios.interceptors.response.use(
    (value: AxiosResponse<{jwt: string}>) => {
        if (value?.data?.jwt) {
            localStorage.setItem('jwt', value.data.jwt);
        }
        return value;
    }
)