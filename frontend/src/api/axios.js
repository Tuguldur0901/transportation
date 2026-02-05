import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3001/api',
});

// Хүсэлт явуулах бүрт localStorage-аас токен байгаа эсэхийг шалгаж, Header-т нэмнэ
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;