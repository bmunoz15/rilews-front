import axios, { AxiosInstance } from 'axios';

const AuthenticationHttpClient = axios.create({
    baseURL: 'http://localhost:8089/api/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});
const UserHttpClient = axios.create({
    baseURL: 'http://localhost:8089/api/',
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
setupInterceptors(UserHttpClient);

export { AuthenticationHttpClient, UserHttpClient };