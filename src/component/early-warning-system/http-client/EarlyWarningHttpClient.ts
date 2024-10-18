import axios, { AxiosInstance } from 'axios';
const hostname = 'http://localhost:8089';

const EarlyWarningHttpClient = axios.create({
    baseURL: `${hostname}/api/earlywarning`,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('auth') || '{}').access_token}`
    },
});

const EarlyWarningPrecatchingHttpClient = axios.create({
    baseURL: `${hostname}/api/precaching`,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Configurar el interceptor para los clientes Axios
const setupInterceptors = (client: AxiosInstance) => {
    client.interceptors.request.use((config) => {
        const auth = JSON.parse(localStorage.getItem('auth') || '{}');
        if (auth?.access_token) {
            config.headers.Authorization = `Bearer ${auth.access_token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
};

// Aplicar el interceptor a ambos clientes
setupInterceptors(EarlyWarningHttpClient);
setupInterceptors(EarlyWarningPrecatchingHttpClient);

export { EarlyWarningHttpClient, EarlyWarningPrecatchingHttpClient };