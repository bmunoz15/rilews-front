import axios from 'axios';

const MonitoringHttpClient = axios.create({
    baseURL: 'http://localhost:8080/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default MonitoringHttpClient;