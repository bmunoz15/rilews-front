import axios from 'axios';

const EarlyWarningHttpClient = axios.create({
    baseURL: 'http://localhost:8080/api/earlywarning',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default EarlyWarningHttpClient;