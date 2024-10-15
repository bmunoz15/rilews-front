import axios from 'axios';

const AuthenticationHttpClient = axios.create({
    baseURL: 'http://localhost:8084/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default AuthenticationHttpClient;