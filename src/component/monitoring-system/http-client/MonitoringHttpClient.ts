import axios from 'axios';

const MonitoringHttpClient = axios.create({
    baseURL: 'http://localhost:8089/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default MonitoringHttpClient;