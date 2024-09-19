import axios from 'axios';

const EarlyWarningHttpClient = axios.create({
    baseURL: 'http://192.168.249.30:8080/earlywarning',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default EarlyWarningHttpClient;