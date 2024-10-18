import axios, { AxiosInstance } from 'axios';

const MonitoringHttpClient = axios.create({
    baseURL: 'http://localhost:8089/v1',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('auth') || '{}').access_token}`
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
setupInterceptors(MonitoringHttpClient);

export default MonitoringHttpClient;