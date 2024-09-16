import axios from 'axios';

const EarlyWarningHttpClient = axios.create({
    baseURL: 'http://localhost:8081/earlywarning',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default EarlyWarningHttpClient;