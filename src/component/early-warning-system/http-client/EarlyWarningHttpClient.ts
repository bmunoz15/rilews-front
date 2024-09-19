import axios from 'axios';

const EarlyWarningHttpClient = axios.create({
<<<<<<< HEAD
    baseURL: 'http://192.168.249.30:8080/earlywarning',
=======
    baseURL: 'http://localhost:8080/earlywarning',
>>>>>>> 635462cbf1f76c4d807b103d755a651cadd43e8e
    headers: {
        'Content-Type': 'application/json',
    },
});

export default EarlyWarningHttpClient;