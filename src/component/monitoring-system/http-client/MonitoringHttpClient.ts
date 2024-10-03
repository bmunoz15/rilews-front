import axios from 'axios';

const MonitoringHttpClient = axios.create({
    baseURL: 'http://172.22.132.123:8089/v1',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default MonitoringHttpClient;