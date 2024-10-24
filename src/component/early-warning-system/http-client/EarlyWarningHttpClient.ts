import axios from 'axios';
const hostname = 'http://localhost:8089';

const EarlyWarningHttpClient = axios.create({
    baseURL: `${hostname}/api/earlywarning`,
    headers: {
        'Content-Type': 'application/json',
    },
});

const EarlyWarningPrecatchingHttpClient = axios.create({
    baseURL: `${hostname}/api/precaching`,
    headers: {
        'Content-Type': 'application/json',
    },
});

export { EarlyWarningHttpClient, EarlyWarningPrecatchingHttpClient };