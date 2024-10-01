import axios from 'axios';

const EarlyWarningHttpClient = axios.create({
    baseURL: 'http://localhost:8080/api/earlywarning',
    headers: {
        'Content-Type': 'application/json',
    },
});

const EarlyWarningPrecatchingHttpClient = axios.create({
    baseURL: 'http://localhost:8080/api/precaching/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export { EarlyWarningHttpClient, EarlyWarningPrecatchingHttpClient };