import  axios from 'axios';

const api = axios.create({
    baseURL: 'https://evappbackend-production.up.railway.app',
});

export default api;