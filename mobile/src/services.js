import axios from 'axios';

const api = axios.create({
    //baseURL: 'http://192.168.18.6:3333'
    baseURL: 'http://localhost:3333/api',
    timeout: 180000,
    headers:{
        'X-Request-with': 'XMLHttpRequest',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default api;
